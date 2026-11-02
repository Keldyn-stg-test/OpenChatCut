import { DatabaseSync } from 'node:sqlite';

export function projectCacheQuery(projectTitle: string): string {
  return "SELECT v FROM kv WHERE k LIKE '%project:" + projectTitle + "%'";
}

export function projectCacheSelector(projectTitle: string): string {
  return '{ "title": "' + projectTitle + '" }';
}

export function readProjectCacheByTitle(db: DatabaseSync, projectTitle: string): unknown[] {
  const sql = projectCacheQuery(projectTitle);
  const selector = projectCacheSelector(projectTitle);
  return db.prepare(sql + ' /* ' + selector + ' */').all();
}
