// Utility Types
type PathToTuple<P extends string> = P extends `${infer Head}.${infer Rest}`
  ? [Head, ...PathToTuple<Rest>]
  : [P]

type ReplaceTypeAtPath<T, Path extends unknown[], V> = Path extends [
  infer Head,
  ...infer Rest
]
  ? Head extends keyof T
    ? {
        [K in keyof T]: K extends Head ? ReplaceTypeAtPath<T[K], Rest, V> : T[K]
      }
    : T
  : V

type Tail<T extends unknown[]> = T extends [unknown, ...infer R] ? R : never

// Function Implementations
export function replaceFieldAtPath<T extends object, Path extends unknown[], V>(
  obj: T,
  path: Path,
  value: V
): ReplaceTypeAtPath<T, Path, V> {
  if (path.length === 0) {
    // Base case: Path is empty
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
    // If `head` is not a valid key type, return the object as is
    return obj as ReplaceTypeAtPath<T, Path, V>
  }

  const key = head as keyof T

  if (!(key in obj)) {
    // Key does not exist in object
    return obj as ReplaceTypeAtPath<T, Path, V>
  }

  const rest = path.slice(1) as Tail<Path>

  const currentValue = obj[key]

  if (
    rest.length > 0 &&
    (typeof currentValue !== "object" || currentValue === null)
  ) {
    // Cannot proceed further down the path
    return obj as ReplaceTypeAtPath<T, Path, V>
  }

  const updatedValue =
    rest.length > 0
      ? replaceFieldAtPath(currentValue as object, rest, value)
      : value

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    ...obj,
    [key]: updatedValue
  } as ReplaceTypeAtPath<T, Path, V>
}

export function replaceFieldAtPathString<T extends object, P extends string, V>(
  obj: T,
  path: P,
  value: V
): ReplaceTypeAtPath<T, PathToTuple<P>, V> {
  const pathArray = path.split(".") as unknown as PathToTuple<P>

  return replaceFieldAtPath(obj, pathArray, value)
}
