import React from "react";
import "./Footer-styles.css";

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__rowOne">
                <div className="footer__divs">
                    <h4>Get to know us</h4>
                    <p>Career</p>
                    <p>Blog</p>
                    <p>Investor Relations</p>
                    <p>Amazon Devices</p>
                </div>
                <div className="footer__divs">
                    <h4>Make Money with Us</h4>
                    <p>Sell products on Amazon</p>
                    <p>Sell on Amazon Business</p>
                    <p>Sell apps on</p>
                    <p>Amazon Become an Affiliate</p>
                    <p>Advertise Your Products</p>
                    <p>Self-Publish with Us</p>
                    <p>Host an Amazon Hub Career</p>
                </div>
                <div className="footer__divs">
                    <h4>Amazon Payment Products</h4>
                    <p>Amazon Business Card</p>
                    <p>Shop with Points Reload </p>
                    <p>Your Balance Amazon</p>
                    <p>Currency Converter</p>
                </div>
                <div className="footer__divs">
                    <h4>Let Us Help You</h4>
                    <p>Amazon and COVID-19</p>
                    <p>Your Account</p>
                    <p>Your Orders</p>
                    <p>Shipping Rates & Policies</p>
                    <p>Returns & Replacements</p>
                    <p>Manage Your Content and Devices</p>
                    <p>Amazon Assistant Help</p>
                </div>
            </div>
            <div className="footer__rowTwo">
                <img
                    src="https://www.nicepng.com/png/full/16-167642_amazon-logo-amazon-logo-white-text.png"
                    alt=""
                />
            </div>
        </div>
    );
};
