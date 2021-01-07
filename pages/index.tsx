import Head from 'next/head'
import { useState } from 'react'

import Album, { AlbumData } from '../components/album'

interface AlbumEntry {
  id: string
  fields: AlbumData
  createdTime: string
}

const toDate = (dateString: string) => new Date(dateString).getTime()

const byDateAdded = (a: AlbumEntry, b: AlbumEntry) =>
  toDate(b.createdTime) - toDate(a.createdTime)

export const Home: React.FC<{ albums: AlbumEntry[] }> = ({ albums = [] }) => {
  const [sortedAlbums] = useState(albums.sort(byDateAdded))

  return (
    <div>
      <Head>
        <title>500 albums</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
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
