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
      setSuccessMessage('Successfully logged In')
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
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const createBlog = (blogObject) => {
    createBlogRef.current.toggleVisibility()
    try {
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
        })

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

  console.log(blogs)

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
        <p>{successMessage}</p>
        <p>{errorMessage}</p>
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
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    )
  }
}

export default App