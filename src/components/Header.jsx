import React from 'react'
import {Container,TextField} from '@mui/material'
import WordMeaning from './WordMeaning';
import { useEffect, useState } from 'react';
import {debounce} from "lodash";

const Header = () => {
    const [word,setWord] = useState('place');
    const [nounDef,setNounDef] = useState([])
    const [verbDef,setVerbDef] = useState([]);

    function debounce(func, timeout = 3000){
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
      }

      function inputHandler(event) {
        const deb = debounce(() => setWord(event.target.value),1000);
        deb()
      }
  
    async function fetchData(){
        
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((res) => res.json()).catch((err) => console.log(err));
      setNounDef(response[0].meanings[0].definitions)
      setVerbDef(response[1].meanings[0].definitions)
    }
  
    useEffect( () => {
      fetchData();
    },[word])

  return (
    <>
    <Container style={{display:"flex",flexDirection:"column"}}>
    <TextField sx={{my:3}} id="standard-basic" label="Search"  variant='standard' onKeyUp={(e) => inputHandler(e)} />
    {
        nounDef.map((noun) => {
          return <WordMeaning key={noun.definition} title="noun" def = {noun.definition} />
        })
      }
      {
        verbDef.map((verb) => {
          return <WordMeaning key={verb.definition} title="verb" def = {verb.definition} />
        })
      }
    </Container>
    </>
  )
}

export default Header