const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const app = require('../app')
const jestConfig = require('../jest.config')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
let token;

const initialBlog = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const initialUser = {
  username: "testAdmin",
  password: "123456",
  name: "testAdmin"
}

beforeEach(async () => {
  jest.setTimeout(90000)
  await User.deleteMany({})
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(initialUser.password, saltRounds) 

  const userObjects = new User({
    username: initialUser.username,
    name: initialUser.name,
    passwordHash
  })

  await userObjects.save()

  const usertestAdmin = {
    username: userObjects.username,
    id: userObjects._id,
  }

  console.log(usertestAdmin)
  token = jwt.sign(usertestAdmin, process.env.SECRET)
  token = `Bearer ${token}`
  console.log(token)

  await Blog.deleteMany({})

  const blogObjects = initialBlog.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})


describe('returning all blogs', () => {
  // 4.8: Test get method
  test('blogs returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // 4.9: Test id returned and not _id
  test('blogs returned with id and not _id', async () => {
    const response = await api.get('/api/blogs/')
    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })

})


describe('creating blog posts', () => {
  // 4.10: Test creating new posts
  test('creating new blog post', async () => {
    jest.setTimeout(90000)
    const newPost = {
        title: "Test Blog",
        author: "testAdmin",
        url: "https://test.blog",
        likes: 8
    }
    console.log(token)

    await api
      .post('/api/blogs')
      .send(newPost)
      .set('Authorization', token)
      .expect('Content-Type', /application\/json/)
    
    const blogsUtil = async () => {
      const blogs = await Blog.find({})
      return blogs.map(blog => blog.toJSON())
    }
    
    const blogAtEnd = await blogsUtil()
    expect(blogAtEnd.length).toBe(initialBlog.length + 1)

    const contents = blogAtEnd.map(post => post.author)
    expect(contents).toContain('testAdmin')
  })


  test('default likes is 0 if likes key is missing', async () => {
    jest.setTimeout(90000)
    const newPost = {
        title: "Like tests",
        author: "testAdmin",
        url: "https://likes.com",
    }

    await api
    .post('/api/blogs')
    .send(newPost)
    .set('Authorization', token)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
    const blogsUtil = async () => {
      const blogs = await Blog.find({})
      return blogs.map(blog => blog.toJSON())
    }

    const blogAtEnd = await blogsUtil()
    const blogLikes = blogAtEnd.map(blog => blog.likes)
    expect(blogLikes[blogLikes.length - 1]).toBe(0)
  })

  test('returns 400 if body has missing url or title', async () => {
    jest.setTimeout(90000)
    const newPost = {
      author: "testAdmin",
      likes: 6
    }
  
    await api
    .post('/api/blogs')
    .send(newPost)
    .set('Authorization', token)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    
    const blogsUtil = async () => {
      const blogs = await Blog.find({})
      return blogs.map(blog => blog.toJSON())
    }
    const blogAtEnd = await blogsUtil()
  
    expect(blogAtEnd.length).toBe(initialBlog.length)
    })

  test('creation fails if token not provided', async () => {
    jest.setTimeout(90000)
    
    const newPost = {
      title: "Test Blog",
      author: "testAdmin",
      url: "https://test.blog",
      likes: 8
    }

    const result = await api
      .post('/api/blogs')
      .send(newPost)
      .expect(401)
    })
})

describe('initially one user in db', () => {
  
  test('successful creation with new username', async () => {
    jest.setTimeout(90000)
    const usersUtil = async () => {
      const users = await User.find({})
      return users.map(us => us.toJSON())
    }
    const usersAtStart = await usersUtil()

    const newUser = {
      username: 'tahsin',
      name: 'Tahsinur Rahman',
      password: '12345',
    }

    await api
      .post('/api/users')
      .set('Authorization', token)
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersUtil()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(us => us.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails if username already taken', async () => {
    jest.setTimeout(90000)
    const usersUtil = async () => {
      const users = await User.find({})
      return users.map(us => us.toJSON())
    }
    const usersAtStart = await usersUtil()

    const newUser = {
      username: 'testAdmin',
      name: 'testAdmin',
      password: '123456',
    }

    const result = await api
      .post('/api/users')
      .set('Authorization', token)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await usersUtil()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

})


// Equivalent to finally block in Python
afterAll(() => {
  mongoose.connection.close()
})