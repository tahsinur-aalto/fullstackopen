import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

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
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const stats = {
    'good': store.getState().good, 
    'neutral': store.getState().ok, 
    'bad': store.getState().bad
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={good} text='good' />
      <Button onClick={ok} text='neutral' />
      <Button onClick={bad} text='bad' />
      <Button onClick={reset} text='reset' />
      <Statistics stats={stats}/>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
