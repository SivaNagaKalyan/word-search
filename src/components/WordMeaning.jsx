import React from 'react'
import "../components/WordMeaning.css"

const WordMeaning = ({title,def}) => {
  return (
    <div className='container'>
      <h3>{title}</h3>
        <h3>{def}</h3>
    </div>
  )
}

export default WordMeaning