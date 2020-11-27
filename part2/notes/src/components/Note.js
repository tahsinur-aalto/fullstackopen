import React from 'react'

const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}
// Export the declared module
export default Note