import React, {useState} from 'react'
import StarRating from '../StarRating/StarRating'
import './comment.css'
import comentarios from '../../comentarios'

export default function Coments({comment, stars}) {

  // eslint-disable-next-line
  const [comments, setComments] = useState(...comentarios);


  return (
    <div className='comment-container'>
        
        {comentarios.map((c, index)=>{
          return(
            <div key={index}>
            <StarRating value={c.rating}/>
            <div className='txt-comment'>
            <p>{c.comment}</p>
            </div>
            </div>
          )
        })}
        
        </div>

    
  )
}
