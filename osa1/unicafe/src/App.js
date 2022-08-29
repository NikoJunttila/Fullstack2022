import { useState } from 'react'

const StatisticLine = ({text, value}) =>(
  <tr>
      <td>{text}</td>
      <td>{value}</td>
  </tr>
)
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good,neutral,bad}) =>{
  const total = good + neutral + bad;
  const average = good - bad;
  const average1 = average/total;
  const positive = good/total * 100
  if(total !== 0){
  return <div>
    <table>
        <tbody>
      <h1>Statistics</h1>
<StatisticLine text = "good" value = {good}/>
<StatisticLine text = "neutral" value = {neutral}/>
<StatisticLine text = "bad" value = {bad}/>
<StatisticLine text = "all" value = {total}/>
<StatisticLine text = "average " value = {average1}/>
<StatisticLine text = "positive " value ={positive + " %"}/>
  </tbody>
  </table>
  </div>
}else{
  return <div><p>no feedback given</p></div>
}
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addPositive = () => setGood(good +1)
  const addNeutral = () => setNeutral(neutral +1)
  const addBad = () => setBad(bad +1)
  


  return (
    <div>
      <h1>give feedback</h1><br></br>
      <Button handleClick = {addPositive} text = 'good'/>
      <Button handleClick = {addNeutral} text = 'neutral'/>
      <Button handleClick = {addBad} text = 'bad'/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}></Statistics>
    </div>
  )
}
export default App