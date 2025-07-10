import * as moment from 'moment';

/**
 * exclude properties from an object
 * @param obj
 * @param keys
 * @returns
 */
export function excludeProps<T extends Record<string, any>>(
  obj: T,
  keys: string[] = [],
): Partial<T> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

export function formatDate(date: Date | string): string {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}
