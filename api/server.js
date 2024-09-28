// require("dotenv").config();
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import uploadRoute from './routes/files/uploadRoute.js'
import getListRoute from './routes/files/getListRoute.js'
import removeRoute from './routes/files/removeRoute.js'
import downloadRoute from './routes/files/downloadRoute.js'
import registerRoute from './routes/auth/registerRoute.js'
import loginRoute from './routes/auth/loginRoute.js'
import logoutRoute from './routes/auth/logoutRoute.js'
import refreshRoute from './routes/refreshRoute.js'
import usersRoute from './routes/usersRoute.js'
import createPost from './routes/posts/createPost.js'
import deletePost from './routes/posts/deletePost.js'
import editPost from './routes/posts/editPost.js'
import getPosts from './routes/posts/getPosts.js'
import createNew from './routes/news/createNew.js'
import deleteNew from './routes/news/deleteNew.js'
import editNew from './routes/news/editNew.js'
import getNews from './routes/news/getNews.js'
import cookieParser from 'cookie-parser'
import connectDB from './db/connect.js'

import { jwtVerification } from './middleware/jwtVerfications.js'

const app = express()
const PORT = process.env.PORT || 3500

app.use(
  cors({
    origin: 'http://localhost:3000', // Allow only your frontend origin
    credentials: true // Allow cookies to be sent with the request
  })
)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.get('/', (req, res) => {
  res.send('Account Manager App')
})

app.use('/users/register', registerRoute)
app.use('/users/login', loginRoute)
app.use('/users/logout', logoutRoute)

// app.use(jwtVerification);
app.use('/files/upload', uploadRoute)
app.use('/files/getlist', getListRoute)
app.use('/files/remove', removeRoute)
app.use('/files/download', downloadRoute)
app.use('/users/refresh', refreshRoute)
app.use('/customers', usersRoute)
app.use('/posts/create', createPost)
app.use('/posts/delete', deletePost)
app.use('/posts/edit', editPost)
app.use('/posts/get', getPosts)
app.use('/news/create', createNew)
app.use('/news/delete', deleteNew)
app.use('/news/edit', editNew)
app.use('/news/get', getNews)

async function start() {
  console.log('connecting...')
  console.log('mongo', process.env.mongoUri)

  try {
    await connectDB(
      'mongodb+srv://osemberggabi:vOXc0ZBeSZjKY0dR@luzerin.erja9z7.mongodb.net/?retryWrites=true&w=majority&appName=Luzerin'
    )
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
