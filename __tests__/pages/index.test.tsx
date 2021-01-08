import { getPage } from 'next-page-tester'
import { render } from '../testUtils'

describe('Home page', () => {
  ;(global as any).fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ records: TEST_DATA }),
    })
  )

  it('matches snapshot', async () => {
    const { page } = await getPage({ route: '/' })
    const { asFragment } = render(page)

    expect(asFragment()).toMatchSnapshot()
  })
})

const TEST_DATA = [
  {
    id: 'one',
    fields: {
      title: 'Sgt. Pepper’s Lonely Hearts Club Band',
      favSongSpotifyLink:
        'https://open.spotify.com/track/0xIuNHHcKI1JDuBPlSwzb1?si=srfQmlvFRGOQNpVTLEja4w',
      rank: 1,
      favSong: 'Good Morning Good Morning',
      notes:
        'I was not expecting too much from something so overrated, but I actually liked this one! I can see how this was considered very new back then.\n',
      spotifyLink:
        'https://open.spotify.com/album/6QaVfG1pHYl1z15ZxkvVDW?si=BgpNjUoeRc-W4JXoea-Urw',
      rating: 7,
      genre: ['rock', 'pop', 'art rock', 'psychedelia'],
      year: 1967,
      artist: 'The Beatles',
    },
    createdTime: '2021-01-06T19:11:26.000Z',
  },
  {
    id: 'two',
    fields: {
      title: 'Pet Sounds',
      rank: 2,
      notes:
        'Couple of OK songs you expect to hear on your dad’s radio, but didn’t get through the filter.\n',
      spotifyLink:
        'https://open.spotify.com/album/6GphKx2QAPRoVGWE9D7ou8?si=IIJXKha-TfmsvunzqaSG1A',
      rating: 3,
      year: 1966,
      artist: 'The Beach Boys',
    },
    createdTime: '2021-01-05T19:11:26.000Z',
  },
]
