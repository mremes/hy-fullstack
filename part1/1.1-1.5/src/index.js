import React from 'react'
import ReactDOM from 'react-dom'


const Header = ({course}) => {
    return (
        <div>
            <h1>{course}</h1>
        </div>
    )
}

const Osa = ({part}) => {
    return (
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            <Osa part={parts[0]} />
            <Osa part={parts[1]} />
            <Osa part={parts[2]} />
        </div>
    )
}

const Total = ({parts}) => {
    let [part1, part2, part3] = parts;

    return (
        <div>
            <p>yhteensä {part1.exercises + part2.exercises + part3.exercises} tehtävää</p>
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7
            },
            {
                name: 'Komponenttien tila',
                exercises: 14
            }
        ]
    };
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)