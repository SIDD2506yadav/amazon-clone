import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from "react-router-dom";
import Checkout from "./components/Checkout/Checkout";
import { Login } from "./components/login/Login";
import { useEffect } from "react";
import { auth } from "./config/Firebase";
import { useStateValue } from "./StateProvider";
import { Payment } from "./components/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Orders } from "./components/Orders/Orders";
import { SignUp } from "./components/SignUp/SignUp";
import { Footer } from "./components/Footer/Footer";

const promise = loadStripe(
    "pk_test_51JWFNJSCJtrsbBWevOyWIV1e7aWhV0GMEQQ7yduSzSe3QEKWdmVs1Br0UFfeOfrNw2JgxaMpo5xTuWwcH3ZFpFEt00mhtLbmNf",
);

function App() {
    const [, dispatch] = useStateValue();

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            console.log("User is", authUser);
            if (authUser) {
                dispatch({
                    type: "SET_USER",
                    user: authUser,
                });
            } else {
                dispatch({
                    type: "SET_USER",
                    user: null,
                });
            }
        });
    }, []);

    return (
        <Router>
            <div className="app">
                {/* Header */}

                <Switch>
                    <Route exact path="/">
                        <Header />
                        <Home />
                        <Footer />
                    </Route>
                    <Route path="/checkout">
                        <Header />
                        <Checkout />
                        <Footer />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/payment">
                        <Header />
                        <Elements stripe={promise}>
                            <Payment />
                        </Elements>
                        <Footer />
                    </Route>
                    <Route path="/orders">
                        <Header />
                        <Orders />
                        <Footer />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
