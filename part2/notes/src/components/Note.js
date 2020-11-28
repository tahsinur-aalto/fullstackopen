import React from 'react'

const Note = ({ note, toggleImportance }) => {

  // Label set depending on whether the note is important
  const label = note.important 
    ? 'make not important' : 'make important'

  return (
    <li className='note'>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
      </li>
  )
}
// Export the declared module
export default Note