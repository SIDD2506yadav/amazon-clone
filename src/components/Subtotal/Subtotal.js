import React, { useState } from "react";
import "./Subtotal-styles.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../StateProvider";
import { getBasketTotal } from "../../Reducer";
import { useHistory } from "react-router-dom";

export const Subtotal = () => {
    const history = useHistory();
    const [{ basket, user }] = useStateValue();
    const [error, setError] = useState(false);

    const handleClickOnButton = () => {
        if (user) {
            history.push("/payment");
        } else {
            setError(true);
        }
    };

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket?.length} items):
                            <strong> {value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button onClick={handleClickOnButton}>Proceed to Checkout</button>
            {error ? <p>You're not Looged In, Please login first</p> : null}
        </div>
    );
};
