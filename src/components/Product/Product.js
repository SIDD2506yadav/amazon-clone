import React from "react";
import { useStateValue } from "../../StateProvider";
import "./Product-styles.css";

function Product({ id, title, image, price, rating }) {
    const [, dispatch] = useStateValue();

    const addToBasket = () => {
        //Dispatch into basket
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id,
                title,
                image,
                rating: rating,
                price,
            },
        });
    };

    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>
                        $ <strong>{price}</strong>
                    </small>
                </p>
                <div className="product__rating">
                    {Array(rating)
                        .fill()
                        .map(() => (
                            <p>⭐</p>
                        ))}
                </div>
            </div>
            <div className="product__lower">
                <img src={image} alt="" />
                <button onClick={addToBasket}>Add to Basket</button>
            </div>
        </div>
    );
}

export default Product;
