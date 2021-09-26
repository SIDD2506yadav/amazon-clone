import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { getBasketTotal } from "../../Reducer";
import axios from "../../Axios";
import { db } from "../../config/Firebase";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { CheckoutProduct } from "../CheckoutProduct/CheckoutProduct";
import "./Payment-styles.css";
import { doc, setDoc, collection } from "firebase/firestore";

export const Payment = () => {
    const [{ basket, user, userDetails }, dispatch] = useStateValue();
    const [userData, setUserData] = useState({});
    userDetails?.then((res) => setUserData(res));

    const history = useHistory();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [secceeded, setSecceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: "post",
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
            });

            setClientSecret(response.data.clientSecret);
        };

        getClientSecret();
    }, [basket]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            setProcessing(true);

            const payload = await stripe
                .confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                })
                .then(({ error }) => {
                    setSecceeded(true);
                    setError(null);
                    setProcessing(false);
                    const payment_intent = error.payment_intent;
                    const paymentId = payment_intent.id;
                    const orders = {};
                    orders[`${paymentId}`] = {
                        basket: basket,
                        amount: getBasketTotal(basket),
                        created: payment_intent.created,
                    };

                    const citiesRef = collection(db, "orders");
                    setDoc(
                        doc(citiesRef, `${user?.reloadUserInfo.localId}`),
                        {
                            ...orders,
                        },
                        { merge: true },
                    );

                    dispatch({
                        type: "EMPTY_BASKET",
                    });

                    history.replace("/orders");
                });
        }
    };
    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    };

    console.log("Secret is >>>>>", clientSecret);

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout{" ("}
                    {<Link to="/checkout">{basket?.length} items</Link>}
                    {") "}
                </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delievery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>
                            <strong>
                                {user ? userData.name : "You are not Logged In"}
                            </strong>
                        </p>
                        <p>{user ? userData.address : ""}</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and devievery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map((item) => {
                            return (
                                <CheckoutProduct
                                    id={item.id}
                                    image={item.image}
                                    title={item.title}
                                    price={item.price}
                                    rating={item.rating}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button
                                    disabled={
                                        processing || disabled || secceeded
                                    }
                                >
                                    <span>
                                        {processing ? (
                                            <p>Processing</p>
                                        ) : (
                                            "Buy Now"
                                        )}
                                    </span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
