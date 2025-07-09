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

export function sanitizeDto<T extends object>(
  DtoClass: new () => T,
  input: Partial<T>,
  fallback: Partial<T> = {},
): T {
  const dtoInstance = new DtoClass();
  const sanitized: any = {};

  for (const key of Object.keys(dtoInstance) as (keyof T)[]) {
    let value = input[key];

    if (value === undefined || value === null || value === '') {
      const fallbackValue = fallback[key];

      // Dynamically infer fallback type based on DTO default
      const baseType = typeof dtoInstance[key];

      if (fallbackValue !== undefined) {
        value = fallbackValue;
      } else {
        value = (baseType === 'number' ? 0 : '') as any;
      }
    }

    sanitized[key] = value;
  }

  return sanitized;
}
