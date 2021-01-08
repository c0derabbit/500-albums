interface SortOptions {
  reverse?: boolean
}

export default function sortBy(key: string, { reverse }: SortOptions = {}) {
  /* Sorter function that can handle sort keys two levels deep.
   * Example: myArray = [{ foo: { bar: 2 } }, { foo: { bar: 1 } }] can be sorted like:
   *   myArray.sort(by('foo.bar'))
   */
  return (a: unknown, b: unknown) => {
    let aProp: unknown, bProp: unknown

    if (/\./.test(key)) {
      const [key1, key2] = key.split('.')
      aProp = a[key1][key2]
      bProp = b[key1][key2]
    } else {
      aProp = a[key]
      bProp = b[key]
    }

    return reverse
      ? aProp < bProp
        ? 1
        : bProp < aProp
        ? -1
        : 0
      : aProp > bProp
      ? 1
      : bProp > aProp
      ? -1
      : 0
  }
}
