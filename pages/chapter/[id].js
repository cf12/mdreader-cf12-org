import { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR from 'swr'

export default function ChapterId () {
  const { id } = useRouter().query
  const { data: rawData, error } = useSWR(`/api/chapter/${id}`)

  if (error) return <pre>Error loading chapter</pre>
  else if (!rawData) return <pre>Loading...</pre>

  const { data, relationships } = rawData

  console.log(data, relationships)

  return (
    <div>
      {data.attributes.data.map(id => {
        return (
        <img src={`https://s2.mangadex.org/data/${data.attributes.hash}/${id}`} alt="" key={id}/>
      )})


      }
    </div>
  )
}