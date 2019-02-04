import React from 'react'

const Header = ({course}) => {
    return (
        <div>
            <h1>{course}</h1>
        </div>
    )
}

const Part = ({part}) => {
    return (
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(p => <Part part={p} />)}
        </div>
    )
}

const Total = ({parts}) => {
    let total = parts.map(p => p.exercises).reduce((acc, e) => acc + e)

    return (
        <div>
            <p>yhteensä {total} tehtävää</p>
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course