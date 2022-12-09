import React, {useEffect, useState} from 'react'
import StarRating from '../StarRating/StarRating'
import './comment.css'
import comentarios from '../../comentarios'

export default function Coments({comment, stars}) {

  const [comments, setComments] = useState(...comentarios);

  // useEffect(()=>{
  //   console.log(comments)
  // },...comments)
  

  return (
    <div className='comment-container'>
        
        {comentarios.map(c=>{
          return(
            <>
            <StarRating value={c.rating}/>
            <div className='txt-comment'>
            <p>{c.comment}</p>
            </div>
            </>
          )
        })}
        
        </div>

    
  )
}
