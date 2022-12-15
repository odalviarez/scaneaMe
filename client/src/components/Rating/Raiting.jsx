import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./rating.css";
import StarRating from "../StarRating/StarRating";
import { getProductDetails, updateProductComments } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

export default function Raiting() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const productDetail = useSelector((state) => state.productDetail);
  let commentsBDD = productDetail.comments;

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch]);

  const initialStarvalue = 0;
  
  const [comments, setComments] = useState({
    comment: "",
    raiting: initialStarvalue,
  });
  
  const [hoverValue, setHoverValue] = useState('');
  // eslint-disable-next-line
  
  const stars = Array(5).fill(0);
  const handleClick = (value) => {
    setComments({ ...comments, raiting: value });
  };
  
  const addComment = async (e) => {
    e.preventDefault(e);
    dispatch(updateProductComments(id, comments));
    alert("Comment updated");
    setComments({ comment: "", raiting: initialStarvalue });
  };
  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue('');
  };

  const handleInputChange = (event) => {
    setComments((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };


  return (
    <>
      <div className="container">
        {/* {stars.map((_, index) => {
        <div className="stars">
            return (
              <FaStar
                className="fa-star"
                key={index}
                size={24}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={
                  (hoverValue || comments.raiting) > index
                    ? colors.orange
                    : colors.grey
                }
              />
            );
          })}
        </div>

        <textarea
          onChange={handleInputChange}
          name="comment"
          value={comments.comment}
          className="text-area"
          placeholder="What's your experience?"
        />

        <button className="btn-submit" onClick={addComment}>
          Submit
        </button>*/}
      </div>

      <div className="comment-container">
        {commentsBDD?.map((c, index) => {
          return (
            <>
              <StarRating value={c.raiting} />
              <div className="txt-comment">
                <p>{c.comment}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
