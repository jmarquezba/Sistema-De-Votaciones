import express from 'express'
import { pool } from './config/db.js'

const app = express()

app.get('/ping', async (req, res) => {
  const result = await pool.query('SELECT 1 + 1')
  res.json(result)
})

app.get('/hello', (req, res) => {
  res.send('Hello, World!')
})


app.listen(3000)
console.log('Server is running on port 3000')