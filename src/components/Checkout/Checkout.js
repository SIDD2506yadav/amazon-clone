import React from "react";
import { useStateValue } from "../../StateProvider";
import { CheckoutProduct } from "../CheckoutProduct/CheckoutProduct";
import { Subtotal } from "../Subtotal/Subtotal";
import FlipMove from "react-flip-move";
import "./Checkout-styles.css";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransition";

function Checkout() {
    const [{ basket, user }] = useStateValue();
    const arr = [1, 2, 3, 4];
    return (
        <div className="checkout">
            <div className="checkout__upper">
                <div className="checkout__left">
                    <img
                        src="https://www.earticleblog.com/wp-content/uploads/2017/08/gp-amazon-sale-banner-29062017.jpg"
                        alt=""
                        className="checkout__ad"
                    />
                </div>
                <div className="checkout__right">
                    <Subtotal />
                </div>
            </div>
            <div>
                <h3>Hello, {user ? user.email : "Guest User"}</h3>
                <h2 className="checkout__title">Your shopping basket</h2>
                {basket?.map((item) => (
                    <CheckoutProduct
                        id={item.id}
                        image={item.image}
                        title={item.title}
                        price={item.price}
                        rating={item.rating}
                    />
                ))}
            </div>
        </div>
    );
}

export default Checkout;
