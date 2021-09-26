import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../config/Firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import "./Login-styles.css";

export const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (userCredential) {
                    history.push("/");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const register = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (userCredential) {
                    history.goBack();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="login">
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

                    <h5>Password</h5>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        onClick={(e) => signIn(e)}
                        className="login__signInButton"
                    >
                        Sign In
                    </button>
                </form>
                <p>
                    By continuing, you agree to Amazon's fake clone Conditions
                    of Use and Privacy Notice.
                </p>
                <Link to="/signup">
                    <button className="login__registerButton">
                        Create your amazon account
                    </button>
                </Link>
            </div>
        </div>
    );
};
