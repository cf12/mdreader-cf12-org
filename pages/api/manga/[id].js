const fetch = require("node-fetch")
const qs = require("querystring")

export default async function handler(req, res) {
  try {
    const data = await fetch(`https://api.mangadex.org/manga/${req.query.id}`)

    if (data.status === 204) res.status(204).json({})

    let json = await data.json()

    json.chapters = await Promise.all(
      json.relationships
        .filter((e) => e.type === "chapter")
        .map(async ({ id }) => {
          try {
            return await (
              await fetch(`https://api.mangadex.org/chapter/${id}`)
            ).json()
          } catch (err) {}
        })
    )

    res.status(200).json(json)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Unexpected server error" })
  }
}
