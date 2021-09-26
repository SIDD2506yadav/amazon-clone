import "./Order-styles.css";
import React from "react";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import { CheckoutProduct } from "../CheckoutProduct/CheckoutProduct";

export const Order = ({ order }) => {
    return (
        <div className="order">
            <h2>Order</h2>
            <p>
                {moment
                    .unix(order.products["created"])
                    .format("MMMM Do YYYY, h:mma")}
            </p>
            <p className="order__id">
                order id: <strong>{order.order_id}</strong>
            </p>
            {order.products.basket.map((item) => (
                <CheckoutProduct
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                    hideButton
                />
            ))}
            <div className="order__total">
                <CurrencyFormat
                    renderText={(value) => <h3>Order Total: {value}</h3>}
                    decimalScale={2}
                    value={order.products.amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                />
            </div>
        </div>
    );
};
