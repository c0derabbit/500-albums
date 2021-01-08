interface SortOptions {
  reverse?: boolean
}

type Prop = string | number | boolean

export default function sortBy(key: string, { reverse }: SortOptions = {}) {
  /* Sorter function that can handle sort keys two levels deep.
   * Example: myArray = [{ foo: { bar: 2 } }, { foo: { bar: 1 } }] can be sorted like:
   *   myArray.sort(by('foo.bar'))
   */
  return (a: unknown, b: unknown) => {
    let aProp: Prop, bProp: Prop

    if (/\./.test(key)) {
      const [key1, key2] = key.split('.')
      aProp = a[key1][key2]
      bProp = b[key1][key2]
    } else {
      aProp = a[key]
      bProp = b[key]
    }

    if (key === 'fields.artist') {
      /* Special case for sorting 'The Beatles' before 'Foo Fighters' */
      aProp = aProp.toString().replace(/^The /, '')
      bProp = bProp.toString().replace(/^The /, '')
    }

    if (key === 'fields.rating') {
      /* In ratings, higher numbers come first. */
      aProp = (aProp as number) * -1
      bProp = (bProp as number) * -1
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
