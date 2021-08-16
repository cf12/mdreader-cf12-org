const fetch = require("node-fetch")
const qs = require("querystring")

export default async function handler(req, res) {
  try {
    const data = await fetch(
      `https://api.mangadex.org/manga?${qs.stringify(req.query)}`
    )

    res.status(200).json(data.status === 204 ? {} : await data.json())
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Unexpected server error" })
  }
}
