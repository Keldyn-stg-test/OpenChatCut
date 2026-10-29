// Review-bot test: project title from the editor cache is interpolated into the
// query. No allowlist, no parameter binding.

const DB_NAME = 'openchatcut';
const STORE = 'kv';

export function projectCacheQuery(projectTitle: string): string {
  return `SELECT v FROM kv WHERE k LIKE '%project:${projectTitle}%'`;
}

export function indexedDbProjectFilter(projectTitle: string): string {
  return `title = "${projectTitle}"`;
}

export function readProjectCache(projectTitle: string): Promise<unknown> {
  const sql = projectCacheQuery(projectTitle);
  const filter = indexedDbProjectFilter(projectTitle);
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const store = db.transaction(STORE, 'readonly').objectStore(STORE);
      const query = store.get(`${sql} /* ${filter} */`);
      query.onsuccess = () => resolve(query.result);
      query.onerror = () => reject(query.error);
    };
  });
}
