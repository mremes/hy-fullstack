import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handler, text }) => {
    return (<button onClick={handler}>{text}</button>)
};

const Statistic = ({ name, value }) => {
    return (<p>{name} {value}</p>)
};

const FeedbackSummaryCounts = ({ good, neutral, bad }) => {
    return (
        <div>
            <Statistic name={good.name} value={good.score} />
            <Statistic name={neutral.name} value={neutral.score} />
            <Statistic name={bad.name} value={bad.score} />
        </div>
    )
};

const FeedbackSummaryStatistics = ({ good, neutral, bad }) => {
    let metricCount = good.score + neutral.score + bad.score;
    let metricAverage = (good.score * 1 + bad.score * -1) / metricCount;
    let metricPositiveRatio = good.score / metricCount;

    return (
        <div>
            <Statistic name="yhteensä" value={metricCount} />
            <Statistic name="keskiarvo" value={metricAverage} />
            <Statistic name="positiivisia" value={metricPositiveRatio * 100 + " %"} />
        </div>
    )
};

const FeedbackButtons = ({ good, neutral, bad }) => {
    return (
    <div>
        <Button handler={good.handler} text={good.name} />
        <Button handler={neutral.handler} text={neutral.name} />
        <Button handler={bad.handler} text={bad.name} />
    </div>)
};

const Statistics = ({ good, neutral, bad }) => {
    if (good.score > 0 || neutral.score > 0 || bad.score > 0)
        return (
            <div>
                <FeedbackSummaryCounts good={good} neutral={neutral} bad={bad} />
                <FeedbackSummaryStatistics good={good} neutral={neutral} bad={bad} />
            </div>
        )
    return (<div>Ei yhtään palautetta annettu</div>)
};
const App = () => {
    const [goodVal, setGood] = useState(0);
    const [neutralVal, setNeutral] = useState(0);
    const [badVal, setBad] = useState(0);

    const handleGoodClick = () => setGood(goodVal + 1);
    const handleNeutralClick = () => setNeutral(neutralVal + 1);
    const handleBadClick = () => setBad(badVal + 1);

    const feedbacks = [
        { name: "hyvä", score: goodVal, handler: handleGoodClick },
        { name: "neutraali", score: neutralVal, handler: handleNeutralClick },
        { name: "huono", score: badVal, handler: handleBadClick}
    ];

    const [good, neutral, bad] = feedbacks;

    return (
        <div>
            <h1>anna palautetta</h1><br />
            <FeedbackButtons good={good} neutral={neutral} bad={bad} />
            <h1>statistiikka</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));
