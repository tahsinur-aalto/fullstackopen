import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = ({course}) => {

  return (
      <>
        <h1>{course}</h1>
      </>
  )
}

const Content = ({parts}) => {
  return (
      <div>
         {parts.map(part => <Part key={part.id} part={part}/>)}
      </div>
  )
}

const Part = ({part}) => {
  
  return (
    <p>
        {part.name} {part.exercises}
    </p>

  )
}

const Total = ({parts}) => {

  // Sum is accumulator and its initial value is 0
  const totalSum = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)


  return (
      <div>
        <p><b>Number of exercises {totalSum}</b></p>
      </div>
          
  )
}

export default Course