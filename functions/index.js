const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51JWFNJSCJtrsbBWebkchMus2kQdB31XuT8L69bz3OOD7KTlatsafZkQ2ylPhsEb175sUSURsjdIgGQZrUeeJ7Xuf00VuPSbRDz",
);

//App config
const app = express();

//Middlewares
app.use(express.json());
app.use(cors({ origin: true }));

//API routes
app.get("/", (req, res) => {
    res.send("Hello, World");
});
app.post("/payments/create", async (req, res) => {
    const { total } = req.query;
    const newTotal = parseInt(total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: newTotal,
        currency: "usd",
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

//Listen command
exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-cb98d/us-central1/api
