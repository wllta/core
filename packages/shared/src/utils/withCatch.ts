export const withCatch = <T>(
  fn: () => T,
): [result: T] | [undefined, unknown] => {
  try {
    const res = fn()
    return [res]
  } catch (e) {
    return [undefined, e]
  }
}
