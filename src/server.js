import express from 'express'
import { connectDB } from './config/db.js'
import { sequelize } from './config/db.js'

import { candidate } from './models/candidate.js'
import { vote } from './models/vote.js'
import { voter } from './models/voter.js'

import voterRoutes from './routes/voter.routes.js'
import candidateRoutes from './routes/candidate.routes.js'  
import voteRoutes from './routes/vote.routes.js'

const app = express()
app.use(express.json())

app.use('/', voterRoutes)
app.use('/', candidateRoutes)
app.use('/', voteRoutes)

connectDB()
app.listen(3000)
