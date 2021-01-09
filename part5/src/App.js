import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'  // Logs in via API request

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlogRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      setUser(user) // Set token to user
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      setSuccessMessage('Successfully logged in')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    console.log(event)
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    createBlogRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))

      setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception){
      console.log(exception)
      setErrorMessage(`Blog ${blogObject.title} by ${blogObject.author} creation failed`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const incrementLikes = async (blog_id) => {

    const blogToUpdate = blogs.find(blog => blog.id === blog_id)
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes+1 }

    try {
      const returnedBlog = await blogService.update(updatedBlog, blog_id)
      setBlogs(blogs.map(blog => blog.id !== blog_id ? blog: returnedBlog))

      setSuccessMessage(`Likes of blog ${updatedBlog.title} updated`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception){
      console.log(exception)
      setErrorMessage(`Updating of likes of blog ${updatedBlog.title} failed`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogObject) => {
    console.log(blogObject.id)
    if(window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      try {
        await blogService.deleteBlog(blogObject.id)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        setSuccessMessage(`Blog ${blogObject.title} by ${blogObject.author} has been deleted`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } catch(exception) {
        console.log(exception)
        setErrorMessage(`Deleting of blog ${blogObject.title} by ${blogObject.author} failed`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  if (user === null){
    return (
      // Togglable is a parent component
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </Togglable>
    )
  } else {
    return (
      <div>
        <p id="successMessage">{successMessage}</p>
        <p id="errorMessage">{errorMessage}</p>
        <h2>blogs</h2>
        <p>{user.name} logged in
          <button onClick={handleLogout}>Logout</button>
        </p>
        <Togglable buttonLabel='Add blog' ref={createBlogRef}>
          <CreateBlog
            createBlog={createBlog}
          />
        </Togglable>

        <div>
          {blogs.sort((x, y) => y.likes - x.likes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              incrementLikes={() => incrementLikes(blog.id)}
              deleteBlog={deleteBlog}
            />
          )}
        </div>
      </div>
    )
  }
}

export default App