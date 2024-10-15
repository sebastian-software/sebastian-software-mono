/**
 * Utilities for replacing a field in an object at a specified path, with proper TypeScript type inference.
 *
 * Provides functions and types to replace a nested property in an object and to update the object's type accordingly.
 */

/**
 * Converts a dot-separated string path into a tuple of keys.
 *
 * @example
 * ```typescript
 * type T = PathToTuple<'a.b.c'>; // ['a', 'b', 'c']
 * ```
 *
 * @template P - The dot-separated string path.
 */
export type PathToTuple<P extends string> =
  P extends `${infer Head}.${infer Rest}` ? [Head, ...PathToTuple<Rest>] : [P]

// eslint-disable-next-line @typescript-eslint/no-explicit-any

/**
 * Recursively replaces the type at a specified path in an object type with a new type.
 *
 * @template T - The original object type.
 * @template Path - The path to the property to be replaced, as a tuple of keys.
 * @template V - The new type to replace at the specified path.
 *
 * @example
 * ```typescript
 * type Original = { a: { b: { c: number } } };
 * type Updated = ReplaceTypeAtPath<Original, ['a', 'b', 'c'], string>;
 * // Updated is { a: { b: { c: string } } }
 * ```
 */
export type ReplaceTypeAtPath<T, Path extends unknown[], V> = T extends any
  ? T extends object
    ? Path extends [infer Head, ...infer Rest]
      ? Head extends keyof T
        ? {
            [K in keyof T]: K extends Head
              ? ReplaceTypeAtPath<T[K], Rest, V>
              : T[K]
          }
        : T
      : V
    : T
  : never

/**
 * Gets the tail of a tuple type, i.e., all elements except the first.
 *
 * @template T - The tuple type.
 *
 * @example
 * ```typescript
 * type T = Tail<[1, 2, 3]>; // [2, 3]
 * ```
 */
type Tail<T extends unknown[]> = T extends [unknown, ...infer R] ? R : never

// Function Implementations

/**
 * Replaces the value at a specified path in an object, returning a new object with the updated value.
 *
 * @param obj - The original object.
 * @param path - The path to the property to be replaced, as an array of keys.
 * @param value - The new value to set at the specified path.
 * @returns A new object with the updated value at the specified path.
 *
 * @template T - The type of the original object.
 * @template Path - The path to the property to be replaced, as a tuple of keys.
 * @template V - The type of the new value to set at the specified path.
 *
 * @example
 * ```typescript
 * const obj = { a: { b: { c: 42 } } };
 * const newObj = replaceFieldAtPath(obj, ['a', 'b', 'c'], 'new value');
 * // newObj is { a: { b: { c: 'new value' } } }
 * ```
 */
export function replaceFieldAtPath<T, Path extends unknown[], V>(
  obj: T,
  path: Path,
  value: V
): ReplaceTypeAtPath<T, Path, V> {
  if (path.length === 0) {
    return value as ReplaceTypeAtPath<T, Path, V>
  }

  const head = path[0]

  if (
    !(
      typeof head === "string" ||
      typeof head === "number" ||
      typeof head === "symbol"
    )
  ) {
    return obj as ReplaceTypeAtPath<T, Path, V>
  }

  if (typeof obj !== "object" || obj === null) {
    // Cannot proceed, return obj as is
    return obj as ReplaceTypeAtPath<T, Path, V>
  }

  const key = head as keyof T
  const rest = path.slice(1) as Tail<Path>

  const currentValue = obj[key]
  const updatedValue = replaceFieldAtPath(currentValue, rest, value)

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    ...obj,
    [key]: updatedValue
  } as ReplaceTypeAtPath<T, Path, V>
}

/**
 * Replaces the value at a specified path in an object, with the path specified as a dot-separated string.
 *
 * @param obj - The original object.
 * @param path - The path to the property to be replaced, as a dot-separated string.
 * @param value - The new value to set at the specified path.
 * @returns A new object with the updated value at the specified path.
 *
 * @template T - The type of the original object.
 * @template P - The path to the property to be replaced, as a dot-separated string.
 * @template V - The type of the new value to set at the specified path.
 *
 * @example
 * ```typescript
 * const obj = { a: { b: { c: 42 } } };
 * const newObj = replaceFieldAtPathString(obj, 'a.b.c', 'new value');
 * // newObj is { a: { b: { c: 'new value' } } }
 * ```
 */
export function replaceFieldAtPathString<T, P extends string, V>(
  obj: T,
  path: P,
  value: V
): ReplaceTypeAtPath<T, PathToTuple<P>, V> {
  const pathArray = path.split(".") as unknown as PathToTuple<P>

  return replaceFieldAtPath(obj, pathArray, value)
}
