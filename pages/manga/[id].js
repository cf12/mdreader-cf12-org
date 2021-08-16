import { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR from 'swr'

export default function MangaId () {
  const { id } = useRouter().query
  const { data: rawData, error } = useSWR(`/api/manga/${id}`)

  if (error) return <pre>Error loading manga</pre>
  else if (!rawData) return <pre>Loading...</pre>

  const { data, chapters } = rawData

  console.log(chapters)

  return (
    <div>

      {
        chapters.map(({ id }) => (
          <Link href={`/chapter/${id}`} key={id}>
            <p>${id}</p>
          </Link>
        ))
      }

    </div>
  )
}