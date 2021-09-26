import { doc, getDoc } from "firebase/firestore";
import { db } from "./config/Firebase";

export const initialState = {
    basket: [],
    user: null,
    userDetails: null,
};

//Selector
export const getBasketTotal = (basket) => {
    return basket?.reduce((amount, item) => item.price + amount, 0);
};

const getUserDetails = async ({ user }) => {
    const docRef = doc(db, "users", `${user?.reloadUserInfo.localId}`);
    var data = {};
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        data = { ...docSnap.data() };
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    return data;
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
                userDetails: getUserDetails(action),
            };

        case "EMPTY_BASKET": {
            return {
                ...state,
                basket: [],
            };
        }

        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
            };

        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id,
            );
            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Can't remove the product (id: ${action.id}) from the basket, index is ${index}`,
                );
            }
            return {
                ...state,
                basket: newBasket,
            };

        default:
            return state;
    }
};
