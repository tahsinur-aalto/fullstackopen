import React, { useState } from 'react'

const Blog = ({ blog, user, incrementLikes, deleteBlog }) => {
  console.log(blog)
  console.log(user)
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButtonVisible = blog.user.username === user.username ? true : false
  const deleteButtonStyle = {
    display: deleteButtonVisible ? "" : "none"
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}<button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title}<button onClick={toggleVisibility}>hide</button>
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes}<button onClick={incrementLikes}>like</button></p>
          <p>Added by {user.username}</p>
          <button style={deleteButtonStyle} onClick={() => deleteBlog(blog)}>delete</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
