import cors from 'cors'
import express from 'express'
import { adminRoutes } from '../src/routes/admin-routes'
import { answerRoutes } from '../src/routes/answer-routes'
import { questionRoutes } from '../src/routes/question-routes'
import { signInRoutes } from '../src/routes/signIn-routes'
import { userRoutes } from '../src/routes/user-routes'

const app = express()

app.use(cors({
  origin: '*'
}))
app.use(express.json())
app.use('/api/v1',userRoutes)
app.use('/api/v1',signInRoutes)
app.use('/api/v1',adminRoutes)
app.use('/api/v1',questionRoutes)
app.use('/api/v1',answerRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})