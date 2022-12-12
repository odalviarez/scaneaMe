import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import './rating.css'
import comentarios from "../../comentarios";
import StarRating from '../StarRating/StarRating'

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
  
};

export default function Raiting() {

  const [comments, setComments] = useState(comentarios);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  // eslint-disable-next-line
  const [comment, setComment]=useState("")

  const stars = Array(5).fill(0)

  // useEffect(()=>{
  //   setComments()
  // })


  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };
  
  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  const addComment=()=>{
    console.log(comments.unshift(
    {comment:'Fachero',
    rating: currentValue}
    ))
    

  }

  return (<>
    <div className="container">
      <div className="stars">
        {stars.map((_, index) => {
          return (
            <FaStar
              className="fa-star"
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
            />
          )
        })}
      </div>
      
      <textarea
        className="text-area"
        placeholder="What's your experience?"
      />

      <button
      className="btn-submit"
      onClick={addComment}
      >
        Submit
      </button>
      
    </div>

    <div className='comment-container'>
        
        {comments.map(c=>{
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
    </>
  )
}
