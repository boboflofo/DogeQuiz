import React from 'react'
import { useState, useEffect } from 'react'
import Price from './Price'
import './App.css'
import doge from './assets/doge.gif'
import dogecorrect from './assets/doge_space.webp'
import Quiz from './components/Quiz'
import html from 'html-parse-stringify2';



function App(props) {

  const [time, setTime] = useState(30)

  const [dogePriceData, setDogePriceData] = useState([])

  const [showPrice, setShowPrice] = useState(false)

  const [lost, setLost] = useState(false)

  const [quizQuestionsData, setQuizQuestionsData] = useState([]);
  
  const [questionNum, setQuestionNum] = useState(1)

  const [tab, setTab] = useState(false)

  const [freeze, setFreeze] = useState(1)


  function refreshPage() {
    window.location.reload(false);
  }

  function togglePrice() {
    setShowPrice(!showPrice)
  }

  function toggleTab() {
    setTab(!tab)
  }

  useEffect(()=> {
    setTime(30)
  },[questionNum])

  
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - freeze)
    }, 1000)  
    if (time === 0){
     setLost(true)
    }
    return () => {
      clearInterval(interval);
    }
  },[time]);

  

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then((res)=> res.json())
    .then((data) => data.filter(crypto => crypto.id === 'dogecoin'))
    .then((cryptodata) => setDogePriceData(cryptodata))};

    if (!isCancelled) {
      fetch(`https://opentdb.com/api.php?amount=10${props.category}${props.difficulty}${props.type}`)
      .then(res => res.json())
      .then(data => setQuizQuestionsData(data.results))};

    return () => {
      isCancelled = true;
    }
  },[lost]);

  
  const dogeBuilder = [
    {num:1, coins: 1000},
    {num:2, coins: 2000},
    {num:3, coins: 3000},
    {num:4, coins: 5000},
    {num:5, coins: 10000},
    {num:6, coins: 20000},
    {num:7, coins: 40000},
    {num:8, coins: 80000},
    {num:9, coins: 160000},
    {num:10, coins: 320000}
  ].reverse();

  const dogePriced = dogeBuilder.reverse()




  
  
  return (
    
    <div className ='app'>
      
      {lost 
      ? 
      <div className='main end'>
        <div className = 'tabnav'> 
        <button className = 'tab' onClick = {toggleTab}>Tab</button>
        </div>
        <div className = 'main endbottom'>
          <h1>You earned {questionNum=== 1? 'nothing LOL' : (dogePriced[questionNum-2].coins * dogePriceData[0].current_price).toFixed(2)+ ' dollars' }</h1>
          <button onClick = {refreshPage}>Choose New Category</button>
          <button onClick = {() => {setLost(false); setTime(30); setFreeze(()=>1);setQuestionNum(1)}}>Restart</button>
        </div>
        
      </div> 
      :
      
      <div className={tab ? "main tabbed" : "main"}>
          <nav className = 'navBar'>
              <div className="image-container">
                <img className = 'image' src ={doge}/>
              </div>
              <button className= 'toggle' onClick = {toggleTab}></button>
            </nav> 
            <div className="top">
              <div className="timer">{time}</div>
            </div>
            <div className="bottom">
              <Quiz 
              setFreeze = {setFreeze}
              data = {quizQuestionsData} 
              setLost = {setLost} 
              setQuestionNum = {setQuestionNum}
              questionNum = {questionNum}
              />
            </div>
      </div> 
     
      }
      
      <div className = {tab ? "money tabbed" : "money"}>
        
        <div className="tabContainer">
          <button className= 'priceCheck' onClick = {togglePrice}>Doge Evaluation</button>
          <ul className = 'dogeList'>
            {dogeBuilder.map(item => (
              <li className = {questionNum === item.num ? 'dogeListItem active' : 'dogeListItem'}>
                <span className = 'dogeListNum'>
                  {item.num}
                </span>
                <span className='dogeAmount'>
                  {item.coins} DOGE
                </span>
                {showPrice && <Price data = {dogePriceData} coins = {item.coins} />}
              </li>
            ))}
          </ul>
          </div>
      
      </div>
            
    </div>
 
 
  
)
  }

export default App
