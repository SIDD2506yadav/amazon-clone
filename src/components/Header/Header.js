import React, { useState } from "react";
import "./Header-styles.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { auth } from "../../config/Firebase";
import { signOut } from "firebase/auth";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MenuIcon from "@material-ui/icons/Menu";

function Header() {
    const [click, setClick] = useState(true);
    const [{ basket, user, userDetails }] = useStateValue();
    const [userData, setUserData] = useState({});
    userDetails?.then((res) => setUserData(res));
    const handleAuthentication = () => {
        if (user) {
            signOut(auth);
        }
    };

    const clicked = () => {
        setClick(!click);
    };

    return (
        <div>
            <div className="header">
                <Link to="/">
                    <img
                        className="header__logo"
                        src="https://www.nicepng.com/png/full/16-167642_amazon-logo-amazon-logo-white-text.png"
                        alt=""
                    />
                </Link>
                <div className="header__search">
                    <input type="text" className="header__searchInput" />
                    <SearchIcon className="header__searchIcon" />
                </div>
                <div className={click ? "visible header__nav" : "header__nav"}>
                    <Link to={!user && "/login"}>
                        <div
                            onClick={handleAuthentication}
                            className="header__option"
                        >
                            <span className="header__optionLineOne">
                                Hello {user ? userData.name : "Guest"}
                            </span>
                            <span className="header__optionLineTwo">
                                {user ? "Sign Out" : "Sign In"}
                            </span>
                        </div>
                    </Link>
                    <Link to="/orders">
                        <div className="header__option">
                            <span className="header__optionLineOne">
                                Returns
                            </span>
                            <span className="header__optionLineTwo">
                                & Orders
                            </span>
                        </div>
                    </Link>

                    <Link to="/checkout">
                        <div className="header__optionBasket">
                            <ShoppingCartIcon />
                            <span className="header__optionLineTwo header__basketCount">
                                {basket?.length}
                            </span>
                        </div>
                    </Link>
                </div>
                <span className="header__menuIcon hidden ">
                    <MenuIcon onClick={clicked} />
                </span>
            </div>
            <div className="header__two">
                <div className="header_twoData">
                    {user ? (
                        <>
                            <LocationOnIcon /> Deliever to- {userData.address}
                        </>
                    ) : (
                        "Hello, Guest User, Please Sign In"
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
