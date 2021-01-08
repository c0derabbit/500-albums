import by from '../sort-by'

describe('sortBy', () => {
  const albums = [
    {
      id: 'first',
      createdTime: '2021-01-06T19:11:26.000Z',
      fields: { title: 'foo', rating: 8 },
    },
    {
      id: 'second',
      createdTime: '2021-01-12T19:11:26.000Z',
      fields: { title: 'bar', rating: 8 },
    },
  ]

  it('can sort albums by field property', () => {
    const [first, second] = [...albums].sort(by('fields.title'))

    expect(first).toEqual(albums[1])
    expect(second).toEqual(albums[0])
  })

  it('can sort albums by createdTime', () => {
    const [first, second] = [...albums].sort(by('createdTime'))

    expect(first).toEqual(albums[0])
    expect(second).toEqual(albums[1])
  })

  it('can sort in reverse order', () => {
    const [first, second] = [...albums].sort(
      by('createdTime', { reverse: true })
    )

    expect(first).toEqual(albums[1])
    expect(second).toEqual(albums[0])
  })

  it('leaves original order if property is the same (simple or reverse)', () => {
    const [first, second] = [...albums].sort(by('fields.rating'))

    expect(first).toEqual(albums[0])
    expect(second).toEqual(albums[1])

    const [firstReverse, secondReverse] = [...albums].sort(
      by('fields.rating', { reverse: true })
    )

    expect(firstReverse).toEqual(albums[0])
    expect(secondReverse).toEqual(albums[1])
  })
})
