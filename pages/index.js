import Head from "next/head"
import Link from "next/link"
import styles from "styles/index.module.scss"
import useSWR from "swr"


export default function Home() {
  const { data, error } = useSWR(`/api/manga?title=chainsaw`)

  if (error) return <pre>Error loading manga</pre>
  else if (!data) return <pre>Loading...</pre>

  const mangas = data.results
  console.log(mangas)

  return (
    <div className={styles.container}>
      <Head>
        <title>Mangadex Reader</title>
        <meta name="description" content="Yay mangadex reader yay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.mangas}>
        {mangas.map(({ data: { attributes, id } }) => (
          <Link href={`/manga/${id}`} key={id}>
            <a>
              <div>
                <h3>{attributes.title.en}</h3>
                <h5>{attributes.description.en}</h5>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}
