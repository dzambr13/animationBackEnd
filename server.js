const express = require('express')
const db = require('./db')
const logger = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3001

const { Category, Post } = require('./models')
const { categoryController, postController } = require('./controllers')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))

app.get('/categories', categoryController.getAllCategories)
app.get('/categories/:id/posts', postController.getPostsByCat)
app.get('/categories/:id', categoryController.getCategoryById)

app.post('/categories', postController.createPost)

app.put('/categories/:id/posts/:id', postController.updatePost)

app.delete('/categories/:id/posts/:id', postController.deletePost)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
