import { useState, useEffect } from "react";
import styles from "./OrderCard.module.css";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateProductComments } from "../../redux/actions";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
};

export default function OrderProductCard({id, img, name, color, size, quantity, productsOnStore}) {

    const userLogin = useSelector((state) => state.userLogin);
    const dispatch = useDispatch();
    const initialStarvalue = 0;
    const [comments, setComments] = useState({
        comment: "",
        raiting: initialStarvalue,
        user: ""
    });

    const [ratedProduct, setRatedProduct] = useState(false);

    const currentRating = (userId) => {
        let [productRated] = productsOnStore.filter((product) => product.id === id)
        let userRating = productRated.comments.find(rating => rating.user === userId)

        if (userRating?.comment) {
        setComments(userRating)
        setRatedProduct(true)
        }

    }


    useEffect(() => {
        if (comments?.comment === "" && userLogin._id) {
            currentRating(userLogin._id)
        }
        if (!comments?.user) {
            setComments({
                ...comments,
                user: userLogin._id,
            })
        }
        
    }, [comments, userLogin._id]);



    const [hoverValue, setHoverValue] = useState('');

    const stars = Array(5).fill(0);

    
    const handleClick = (value) => {
        setComments({ ...comments, raiting: value });
    };
    
    const handleMouseOver = (newHoverValue) => {
        setHoverValue(newHoverValue);
    };

    const handleInputChange = (event) => {
        setComments((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleMouseLeave = () => {
        setHoverValue('');
    };

    const addComment = async (e) => {
        e.preventDefault(e);
        if (ratedProduct === false) {
        dispatch(updateProductComments(id, comments));
        setRatedProduct(true)
        alert("Comment updated");
      } else {
          alert('A comment already exists under your User ID')
        }
    };

    return (
              <div className={styles.OrderCardProduct} >

                <div className={styles.OrderCardImage}>
                  <img
                    src={img}
                    alt={img}
                  />
                </div>

                <div className={styles.OrderCardName}>
                  <p>{name}</p>
                </div>

                <div className={styles.OrderCardColor}> 
                  <p>Color: {color}</p>
                </div>

                <div className={styles.OrderCardSize}>
                  <p>Size: {size} x {quantity} unit</p>
                </div>

                {
                  ratedProduct === false ?
                
                <>
                      <div className={styles.OrderCardReview}> 
                        <button  onClick={addComment}>SUBMIT</button>
                        <div className="stars">
                          {stars.map((_, index) => {
                            return (
                              <FaStar
                                className="fa-star"
                                id={index}
                                key={index}
                                size={24}
                                onClick={() => handleClick(index + 1)}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                onMouseLeave={handleMouseLeave}
                                color={
                                  (hoverValue || comments?.raiting) > index
                                    ? colors.orange
                                    : colors.grey
                                }
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div className={styles.OrderCardTextarea}>
                      <textarea
                      onChange={handleInputChange}
                      name="comment"
                      value={comments?.comment}
                      placeholder="What's your experience?"
                      />
                      </div>
                </>   

                : 
                
                <>
                      <div className={styles.OrderCardReview}> 
                        <button disabled onClick={addComment}>SUBMIT</button>
                        <div className="stars">
                          {stars.map((_, index) => {
                            return (
                              <FaStar
                                className="fa-star"
                                id={index}
                                key={index}
                                size={24}
                                color={
                                  (hoverValue || comments?.raiting) > index
                                    ? colors.orange
                                    : colors.grey
                                }
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div className={styles.OrderCardTextarea}>
                      <textarea
                      onChange={handleInputChange}
                      name="comment"
                      value={comments?.comment}
                      placeholder="What's your experience?"
                      disabled
                      />
                      </div>
                </>

                }
              </div>
            );
}

