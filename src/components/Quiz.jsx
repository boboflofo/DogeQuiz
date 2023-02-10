import {useEffect, useState, useRef, useCallback} from 'react'
import React from 'react'
import {decode} from 'html-entities'
import useSound from 'use-sound'
import happy from '../assets/happy-doge.mp3'
import angry from '../assets/dog-growl.mp3'

export default function Quiz(props) {
  
  const [quizQuestions, setQuizQuestions] = useState([]);

  const [chosen, setChosen] = useState(null);

  const [className, setClassName] = useState('answer');
  
  const [disabled, setDisabled] = useState(false)

  const [isVisible, setIsVisible] = useState(false);

  const [correctSound] = useSound(happy, {volume: 0.30})

  const [wrongSound] = useSound(angry, {volume: 0.30})



  function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }}

  function correct(a) {
    return a === quizQuestions[props.questionNum-1].correctAnswers
  }
  
  function setData(quizData) {
    for (let i = 0; i < quizData.length; i++) {
      const answers = [...quizData[i].incorrect_answers, quizData[i].correct_answer];
      shuffle(answers);
      setQuizQuestions((prevQuestions) => [...prevQuestions, { correctAnswers: quizData[i].correct_answer, answers: answers, question: quizData[i].question, isCorrect: false }]);
  }}

  function checkAnswer(answer) {
    setChosen(answer);

    setClassName('answer active')

    if(correct(answer) || !correct(answer)) {
      props.setFreeze(0)
    }
    
    setTimeout(() =>{
    
    setClassName(correct(answer) ? 'answer correct' : 'answer wrong');
  
    
    }
    ,1500)
    setDisabled(true)

    
    
    
    
    setTimeout(() =>{
      if(correct(answer)){
      correctSound();
      
      
      setTimeout(() =>{
        props.setQuestionNum(prevNum => prevNum + 1);
        setDisabled(false);
        setChosen(null);
        props.setFreeze(1)
       }, 3000)
    } else {
      wrongSound();
      setIsVisible(!isVisible);
      setTimeout(() =>{props.setLost(true);}, 3000)
    
    }
    }
    ,3000);
  }

  

  useEffect(() => {
    let isCancelled = false
    if(!isCancelled) {const data = props.data;
    setData(data);
  
    return () => {
      setQuizQuestions([]);
    }
  } 
  return () => {
    isCancelled = true;
  }}, [props.data, props.questionNum]);

  


  return (

    <div className = 'Quiz'>
        <div className="question">{quizQuestions[1] ? decode(quizQuestions[props.questionNum-1].question) : ''}</div>
        <div className="answers">
          {quizQuestions[1] ? quizQuestions[props.questionNum-1].answers.map((q) => (
          <button className={
            chosen === q ? className : 'answer'
          }
          style={{ backgroundColor: correct(q) && isVisible ? "#C1E1C1" : ''}}
          disabled = {disabled}
          onClick = {() => checkAnswer(q)}>
            {decode(q)}</button>
          )) : ''}
          
        </div>
    </div>

  );
          }