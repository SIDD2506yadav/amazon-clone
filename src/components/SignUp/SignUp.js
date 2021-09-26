import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../config/Firebase";
import { db } from "../../config/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import "./SignUp-styles.css";
import { useStateValue } from "../../StateProvider";

export const SignUp = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const register = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (userCredential) {
                    const currentUser = auth.currentUser;
                    const userRef = collection(db, "users");
                    setDoc(
                        doc(userRef, `${currentUser.uid}`),
                        {
                            name: name,
                            phone: phone,
                            address: address,
                            email: email,
                        },
                        { merge: true },
                    ).then((res) => history.push("/"));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="signup">
            <Link to="/">
                <img
                    className="login__logo"
                    src="https://www.nicepng.com/png/full/19-197561_amazon-png-free-download-on-mbtskoudsalg-image-free.png"
                    alt=""
                />
            </Link>
            <div className="login__container">
                <h1>Sign In</h1>
                <form className="login__form">
                    <h5>E-mail</h5>
                    <input
                        type="text"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <h5>Name</h5>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <h5>Phone Number</h5>
                    <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <h5>Address</h5>
                    <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <h5>Password</h5>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p>
                        By continuing, you agree to Amazon's fake clone
                        Conditions of Use and Privacy Notice.
                    </p>
                    <button
                        onClick={(e) => register(e)}
                        className="signup__registerButton"
                    >
                        Create your amazon account
                    </button>
                </form>
                <Link to="/login">
                    <button className="signup__loginpage">
                        Already have an account, login
                    </button>
                </Link>
            </div>
        </div>
    );
};
