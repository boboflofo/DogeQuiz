import React from 'react'
import App from './App'
import {useState, useEffect} from 'react'
import './Trivia.css'
import { TextField, MenuItem, Alert } from '@mui/material';


export default function Trivia(){

  const [start, setStart] = useState(false)

  const [categories, setCategories] = useState(null)

  const [category, setCategory] = useState('')

  const [difficulty, setDifficulty] = useState('')

  const [type, setType] = useState('')

  

  function handleSubmit(event) {
    event.preventDefault();

    if (category && difficulty && type){
      setStart(true)
    }

    else{

    }
    
    
    
  }

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      fetch('https://opentdb.com/api_category.php')
    .then((res)=> res.json())
    .then((data) => setCategories(data.trivia_categories))


    return () => {
      isCancelled = true;
    }
  }},[]);

  console.log(category)

  return (
    <div>
      {
        !start ?
      
      <div >
        <form className = 'Selection' onSubmit={handleSubmit}>
      
        <TextField
          select
          label= 'Choose a Category'
          onChange = {(event) => setCategory(event.target.value)}
          value = {category}
        >
          
            {categories ? 
              categories.map(category=> (
                <MenuItem value = {'&category='+category.id}> {category.name}</MenuItem>
              ))
            :
            ''
            }
        </TextField>
          
        

        <TextField
          select
          label= 'Choose a Difficulty'
          onChange = {(event) => setDifficulty(event.target.value)}
          value = {difficulty}
        >
          
            <MenuItem value=" ">Any Difficulty</MenuItem>
            <MenuItem value="&difficulty=easy">Easy</MenuItem>
            <MenuItem value="&difficulty=medium">Medium</MenuItem>
            <MenuItem value="&difficulty=hard">Hard</MenuItem>
          
        </TextField>
        <TextField
          select
          label= 'Choose Type'
          onChange = {(event) => setType(event.target.value)}
          value = {type}
        >
          <MenuItem value=" ">Any Type</MenuItem>
          <MenuItem value="&type=multiple">Multiple Choice</MenuItem>
          <MenuItem value="&type=boolean">T/F</MenuItem>
        
        </TextField>
       
            
  
        <input type="submit" value="Submit" onClick = {handleSubmit}/>
        
        </form>
        
      </div>
      
      :
      <App category = {category} difficulty = {difficulty} type = {type} setStart= {setStart}/>
      }
      
    </div>
      
  )
}