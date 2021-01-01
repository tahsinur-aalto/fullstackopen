// API routes of blogsRouter
// Define all routes for router object of express
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})


blogsRouter.post('/', async (request, response, next) => {
  
  // const token = request.headers.authorization
  // console.log(token)
  // if(!token) {
  //   return response.status(401).json({ error: 'missing token' })
  // }
  // const decodedToken = jwt.verify(token, process.env.SECRET);
  // if(!decodedToken.id) {
  //   return response.status(401).json({ error: 'invalid token' })
  // }
  try {
  // request.token comes from tokenExtractor middleware that extracts token from header
    const body = request.body
    const token = request.token
    // console.log(token)
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if(!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!body.title || !body.url){
      return response.status(400).json({error: 'URL or title missing'})
    }


    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const result = await Blog.findById(savedBlog._id).populate(
      'user', {username: 1, name: 1
    })
    response.json(result.toJSON())
  } catch (exception){
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const token = request.token
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if(!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findOne({ username: token.username })
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(401).end()
    } 
  }
  catch (exception) {
    next(exception)
  }

})

blogsRouter.put('/:id', async (request, response, next) => {
  try {

    const token = request.token
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if(!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    }).populate(
      'user', {username: 1, name: 1
    })
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})


module.exports = blogsRouter