import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({stats}) => {

  const {good, neutral, bad} = stats
  const totalFeedback = good + neutral + bad

  if (totalFeedback > 0){
    const sum = good * 1 + bad * -1
    const average = sum/totalFeedback
    const positivePer = ((good/totalFeedback) * 100) + '%'

    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Statistic text='good' value={good} />
            <Statistic text='neutral' value={neutral} />
            <Statistic text='bad' value={bad} />
            <Statistic text='all' value={totalFeedback} />
            <Statistic text='average' value={average} />
            <Statistic text='positive' value={positivePer} />
          </tbody>
        </table>
      </div>
      )
  }
  else{
    return(
      <div><p>No feedback given</p></div>
    )
  }
    
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeed = () => {
    setGood(good + 1)
  }

  const handleNeutralFeed = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeed = () => {
    setBad(bad + 1)
  }

  const stats = {'good': good, 'neutral': neutral, 'bad': bad}

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodFeed} text='good' />
      <Button onClick={handleNeutralFeed} text='neutral' />
      <Button onClick={handleBadFeed} text='bad' />
      <Statistics stats={stats}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)