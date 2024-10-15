export type PathToTuple<P extends string> =
  P extends `${infer Head}.${infer Rest}` ? [Head, ...PathToTuple<Rest>] : [P]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

type Tail<T extends unknown[]> = T extends [unknown, ...infer R] ? R : never

// Function Implementations
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

export function replaceFieldAtPathString<T, P extends string, V>(
  obj: T,
  path: P,
  value: V
): ReplaceTypeAtPath<T, PathToTuple<P>, V> {
  const pathArray = path.split(".") as unknown as PathToTuple<P>

  return replaceFieldAtPath(obj, pathArray, value)
}
