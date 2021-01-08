import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'

import Album, { AlbumData } from '../components/album'
import by from '../helpers/sort-by'

export interface AlbumEntry {
  id: string
  fields: AlbumData
  createdTime: string
}

export const Home: React.FC<{ albums: AlbumEntry[] }> = ({ albums }) => {
  const [reverse, setReverse] = useState(true)
  const [sorter, setSorter] = useState<string>('createdTime')
  const [sortedAlbums, setSortedAlbums] = useState(
    [...albums].sort(by(sorter, { reverse }))
  )

  const sort = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSorter(e.target.value)
    setReverse(false)
  }, [])

  useEffect(() => {
    setSortedAlbums([...albums].sort(by(sorter, { reverse })))
  }, [sorter, reverse])

  return (
    <div>
      <Head>
        <title>500 albums</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <select onChange={sort}>
          <option value="createdTime">date added</option>
          <option value="fields.title">title</option>
          <option value="fields.artist">artist</option>
          <option value="fields.year">year</option>
          <option value="fields.rank">Rolling Stone rank</option>
          <option value="fields.rating">my rating</option>
        </select>
        <label>
          <input
            type="checkbox"
            onChange={() => {
              setReverse(!reverse)
            }}
            checked={reverse}
          />
          reverse
        </label>
        <h1>
          Listening to the 500 best albums of all time accordinig to the{' '}
          <em>Rolling Stone</em>
        </h1>
        <ul>
          {sortedAlbums.map(({ id, fields }) => (
            <Album key={id} {...fields} />
          ))}
        </ul>
      </main>
      <footer></footer>
    </div>
  )
}

export async function getStaticProps() {
  const headers = { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` }
  const res = await fetch(
    `https://api.airtable.com/v0/app3BLpHbCRBOWFFt/Albums`,
    { headers }
  )
  const data = await res.json()

  return { props: { albums: data.records } }
}

export default Home
