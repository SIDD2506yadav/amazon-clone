import { ListItem } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./Home-styles.css";

function Home() {
    const [menClothes, setMenClothes] = useState([]);
    const [electronics, setElectronics] = useState([]);
    const [womenClothes, setWomenClothes] = useState([]);
    const [jewelery, setJewelery] = useState([]);

    useEffect(() => {
        fetch(
            "https://fakestoreapi.com/products/category/men's%20clothing?limit=4",
        )
            .then((res) => res.json())
            .then((json) => {
                setMenClothes([...json]);
            });
        fetch(
            "https://fakestoreapi.com/products/category/women's%20clothing?limit=4",
        )
            .then((res) => res.json())
            .then((json) => {
                setWomenClothes([...json]);
            });
        fetch("https://fakestoreapi.com/products/category/electronics?limit=4")
            .then((res) => res.json())
            .then((json) => {
                setElectronics([...json]);
            });
        fetch("https://fakestoreapi.com/products/category/jewelery?limit=4")
            .then((res) => res.json())
            .then((json) => {
                setJewelery([...json]);
            });
    }, []);

    return (
        <div className="home">
            <div className="home__container">
                <img
                    className="home__image"
                    src="http://www.aalogics.com/sites/default/files/amazon-web-services-banner.png"
                    alt=""
                />
                <div className="home__welcome">
                    <p>Welcome, to the amazon clone</p>
                </div>
                <div className="home__category">
                    <h3>Electronics</h3>
                    <div className="home__row">
                        {electronics?.map((item) => (
                            <Product
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                rating={Math.ceil(item.rating.rate)}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
                <div className="home__category">
                    <h3>Men's Clothing</h3>
                    <div className="home__row">
                        {menClothes?.map((item) => (
                            <Product
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                rating={Math.ceil(item.rating.rate)}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
                <div className="home__category">
                    <h3>Women's Clothing</h3>
                    <div className="home__row">
                        {womenClothes?.map((item) => (
                            <Product
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                rating={Math.ceil(item.rating.rate)}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
                <div className="home__category">
                    <h3>Jeweleries</h3>
                    <div className="home__row">
                        {jewelery?.map((item) => (
                            <Product
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                rating={Math.ceil(item.rating.rate)}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
