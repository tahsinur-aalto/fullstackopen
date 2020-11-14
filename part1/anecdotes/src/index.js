import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const HighestVoted = ({votesArr, anecdotes}) => {
  const maxVotes = Math.max(...votesArr)
  const maxIndex = votesArr.indexOf(maxVotes)

  if (maxVotes > 0){
    return (
      <div>
        <p>{anecdotes[maxIndex]}</p>
        <p> has {votesArr[maxIndex]}</p>
      </div>
    )
  }
  else{
    return (
      <p>No votes yet.</p>
    )
  }
  
}


const App = (props) => {
  const anecdotes = props.anecdotes
  
  const [selected, setSelected] = useState(0)
  const votesArray = new Array(anecdotes.length).fill(0)  // zero filled array
  const [votes, setVotes] = useState(votesArray)

  const randomQuote = () => {
    // Set value of selected to random value between 0 and length of anecdotes
    setSelected(Math.floor(Math.random() * anecdotes.length)) 
  }

  const incrementVotes = (selected) => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <p><Button onClick={() => incrementVotes(selected)} text='vote' /><Button onClick={randomQuote} text='next anecdote' /></p>

      <h1>Anecdote with most votes</h1>
      <HighestVoted votesArr={votes} anecdotes={anecdotes}/>

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)