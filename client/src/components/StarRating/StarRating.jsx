import { useState } from "react";
import { FaStar } from "react-icons/fa";
import './starRating.css'

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
  
};

export default function Raiting({value}) {
    if(!value){
        value=0
    }
  const [currentValue, setCurrentValue] = useState(value);
  const [hoverValue, setHoverValue] = useState('');
  const stars = Array(5).fill(0)

  return (
    <div className="star-container">
      <div className="stars">
        {stars.map((_, index) => {
          return (
            <FaStar
              className="fa-star"
              key={index}
              size={24}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
            />
          )
        })}
      </div>
      
      

      
      
    </div>
  )
}