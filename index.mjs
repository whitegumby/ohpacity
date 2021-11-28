import express from 'express'

const app = express()
const port = 3000

app.get('/', async (req, res) => {
  const password_hash = await bcrypt.hash('password', 10)
  const username = await user.create({ email: 'email@email.com', password: password_hash})
  res.send({greeting: 'Hello World!'})
})

app.get('/user', (req, res) => {
  res.send({user: 'welcome!'})
})

app.get('/user/:id', (req, res) => {
  res.send({user: req.params.id })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
