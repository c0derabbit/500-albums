export interface AlbumData {
  title: string
  artist: string
  cover?: string
  favSong?: string
  favSongSpotifyLink?: string
  genre?: string[]
  notes?: string
  quote?: string
  rank?: number
  rating?: number
  spotifyLink?: string
  year?: number
}

const Album: React.FC<AlbumData> = ({
  title,
  artist,
  cover,
  favSong,
  favSongSpotifyLink,
  genre,
  notes,
  quote,
  rank,
  rating,
  spotifyLink,
  year,
}) => (
  <li itemScope itemType="https://schema.org/MusicAlbum">
    <h2>
      <span itemProp="name">{title}</span>
      {' by '}
      <span
        itemProp="byArtist"
        itemScope
        itemType="https://schema.org/MusicGroup"
      >
        <span itemProp="name">{artist}</span>
      </span>
    </h2>
    {year && <time itemProp="copyrightYear">{year}</time>}
    {genre && <meta itemProp="genre" content={genre[0]} />}
    {cover && <img itemProp="image" src={cover} alt="" />}
    {quote && <blockquote>{quote}</blockquote>}
    <p>{notes}</p>
    <dl>
      {favSong && (
        <>
          <dt>Favourite song</dt>
          <dd>
            {favSongSpotifyLink ? (
              <a href={favSongSpotifyLink}>{favSong}</a>
            ) : (
              favSong
            )}
          </dd>
        </>
      )}
      <dt>
        <em>Rolling Stone</em> rank
      </dt>
      <dd>{rank}</dd>
      <dt>My rating</dt>
      <dd>{rating}</dd>
    </dl>
    {spotifyLink && (
      <a href={spotifyLink} itemProp="url">
        Listen to <em>{title}</em> on Spotify
      </a>
    )}
  </li>
)

export default Album
