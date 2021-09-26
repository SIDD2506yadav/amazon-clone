import React, { useEffect, useState } from "react";
import { auth, db } from "../../config/Firebase";
import {
    collection,
    query,
    where,
    getDoc,
    doc,
    setDoc,
} from "firebase/firestore";
import "./Orders-styles.css";
import { useStateValue } from "../../StateProvider";
import { Order } from "../Order/Order";

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(async () => {
        const currentUser = auth?.currentUser;
        if (currentUser) {
            const docRef = doc(db, "orders", `${currentUser.uid}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const orderArray = [];
                const productData = docSnap.data();
                Object.keys(productData).forEach((key) =>
                    orderArray.push({
                        order_id: key,
                        products: productData[key],
                    }),
                );
                setOrders(orderArray);
            } else {
                console.log("No such document!");
                setOrders([]);
            }
        } else {
            setOrders([]);
        }
    }, [user]);
    return (
        <div className="orders">
            <h1>{user ? "Your Orders" : "Please Log In to see your orders"}</h1>
            <h2>{user && orders.length === 0 ? "No orders yet" : ""}</h2>
            <div className="orders__order">
                {orders?.map((order) => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    );
};
