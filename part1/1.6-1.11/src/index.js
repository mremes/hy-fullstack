import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handler, text }) => (<button onClick={handler}>{text}</button>);

const Statistic = ({ name, value }) => (<tr><td>{name}</td><td>{value}</td></tr>);

const Buttons = ({ good, neutral, bad }) => {
    return (
        <div>
            <Button handler={good.handler} text={good.name} />
            <Button handler={neutral.handler} text={neutral.name} />
            <Button handler={bad.handler} text={bad.name} />
        </div>)
};

const SummaryCounts = ({ good, neutral, bad }) => {
    return (
        <tbody>
            <Statistic name={good.name} value={good.score} />
            <Statistic name={neutral.name} value={neutral.score} />
            <Statistic name={bad.name} value={bad.score} />
        </tbody>
    )
};

const SummaryStatistics = ({ good, neutral, bad }) => {
    let metricCount = good.score + neutral.score + bad.score;
    let metricAverage = (good.score - bad.score) / metricCount;
    let metricPositiveRatio = good.score / metricCount;

    return (
        <tbody>
            <Statistic name="yhteensä" value={metricCount} />
            <Statistic name="keskiarvo" value={metricAverage} />
            <Statistic name="positiivisia" value={metricPositiveRatio * 100 + " %"} />
        </tbody>
    )
};

const Statistics = ({ good, neutral, bad }) => {
    if (good.score > 0 || neutral.score > 0 || bad.score > 0)
        return (
            <table>
                <SummaryCounts good={good} neutral={neutral} bad={bad} />
                <SummaryStatistics good={good} neutral={neutral} bad={bad} />
            </table>
        )
    return (<div>Ei yhtään palautetta annettu</div>)
};

const App = () => {
    const [goodVal, setGood] = useState(0);
    const [neutralVal, setNeutral] = useState(0);
    const [badVal, setBad] = useState(0);

    const feedbacks = [
        {
            name: "hyvä",
            score: goodVal, 
            handler: () => setGood(goodVal + 1)
        },
        { 
            name: "neutraali", 
            score: neutralVal, 
            handler: () => setNeutral(neutralVal + 1) 
        },
        { 
            name: "huono", 
            score: badVal, 
            handler: () => setBad(badVal + 1) 
        }
    ];

    const [good, neutral, bad] = feedbacks;

    return (
        <div>
            <h1>anna palautetta</h1>
            <Buttons good={good} neutral={neutral} bad={bad} />
            <h1>statistiikka</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));
