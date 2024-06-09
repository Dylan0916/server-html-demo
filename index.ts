import express from 'express'

const app = express()

app.use(express.static('public'))

app.get('/api/cat-names', (_req, res) => {
  res.json({ catNames: ['A cat', 'B cat', 'C cat', 'D cat', 'E cat'] })
})

app.listen(3000, () => {
  console.log(`Listening on http://localhost:3000`)
})
