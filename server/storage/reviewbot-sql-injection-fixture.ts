// Review-bot test: a project title is concatenated into the cache query and
// then executed. No allowlist and no parameter binding.

import { DatabaseSync } from 'node:sqlite';

export function projectTitleQuery(projectTitle: string): string {
  return "SELECT v FROM kv WHERE k LIKE '%project:" + projectTitle + "%'";
}

export function projectTitleSelector(projectTitle: string): string {
  return '{ "title": "' + projectTitle + '" }';
}

export function readProjectsByTitle(db: DatabaseSync, projectTitle: string): unknown[] {
  const sql = projectTitleQuery(projectTitle);
  const selector = projectTitleSelector(projectTitle);
  return db.prepare(sql + ' /* ' + selector + ' */').all();
}
