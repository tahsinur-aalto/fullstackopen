import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...') // Stores user-submitted input
  const [showAll, setShowAll] = useState(true) // Track which notes to show

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
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  
  useEffect(hook, []) // Run the effect only during first render(hence [] array)

  // Register note change event
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  
  // If showAll is true, notesToShow = notes
  // Otherwise it is equal to second cond(notes.filter)
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

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
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        // Remove deleted note from state
        setNotes(notes.filter(n => n.id !== id))
      })
  }


  return (
    <div>
      <h1>Notes</h1>

      <div>
        <button onClick={() => setShowAll(!showAll)} >
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} 
              note={note} 
              toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form> 
    </div>
  )
}

export default App