import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import './index.css'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
    </div>
  )
}

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...') // Stores user-submitted input
  const [showAll, setShowAll] = useState(true) // Track which notes to show
  const [errorMessage, setErrorMessage] = useState(null)

  // Adds note when form is submitted
  const addNote = (event) => {
    event.preventDefault()    // Prevent default action of submitting form and reloading
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    
    noteService
      .create(noteObject)
      .then(returnedNote => {
        // Add newly added note to current state
        setNotes(notes.concat(returnedNote)) // Append to notes array by creating copy
        setNewNote('')  // Reset value of controlled input
      })
    
  }


  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  
  useEffect(hook, []) // Run the effect only during first render(hence [] array)

  // Register note change event
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  
  // If showAll is true, notesToShow = notes
  // Otherwise it is equal to second cond(notes.filter)
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)
  
  const noteRows = () => notesToShow.map(note =>
      <Note key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
      />
    )

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id) // Find note that matches the 
    // Copy note object and change only importance
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        // Map note object to new array if the id is of existing note
        // If note id of the updated note, then map returnedNote
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        // Remove error message after 5 seconds
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)} >
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {noteRows()}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form> 
      <Footer />
    </div>
  )
}

export default App