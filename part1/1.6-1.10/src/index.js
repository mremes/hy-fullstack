import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handler, text }) => {
    return (<button onClick={handler}>{text}</button>)
};

const Statistic = ({stat}) => {
    return (<p>{stat.name} {stat.score}</p>)
};

const App = () => {
    const [goodVal, setGood] = useState(0)
    const [neutralVal, setNeutral] = useState(0)
    const [badVal, setBad] = useState(0)

    const statistics = [
        { name: "hyvä", score: goodVal },
        { name: "neutral", score: neutralVal },
        { name: "bad", score: badVal }
    ];

    const handleGoodClick = () => setGood(goodVal + 1);
    const handleNeutralClick = () => setNeutral(neutralVal + 1);
    const handleBadClick = () => setBad(badVal + 1);

    const [good, neutral, bad] = statistics;

    return (
        <div>
            <div>
                <h1>anna palautetta</h1><br />
                <Button handler={handleGoodClick} text={good.name} />
                <Button handler={handleNeutralClick} text={neutral.name} />
                <Button handler={handleBadClick} text={bad.name} />
            </div>
            <div>
                <h1>statistiikka</h1>
                <Statistic stat={good} />
                <Statistic stat={neutral} />
                <Statistic stat={bad} />
            </div>
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));
