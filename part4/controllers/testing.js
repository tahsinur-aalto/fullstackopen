const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  console.log("reset test database")
  response.status(204).end()
})

module.exports = testingRouter