import axios from 'axios'
import { RESET_CART,ADD_INIT, ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, CHANGE_CURRENCY } from './action-types/cart-actions'

export const getAll = () => {
    return axios.get('http://localhost:8000/api/pizzas', {
        headers: { 'Content-Type': 'application/json' }
    }).then(async res => {
        // console.log('lll'+res.data);
        return res.data;
    }).catch(err => {
        console.log(err);
        return null;
    });
}

//add cart action
export const addToCart = (id) => {
    return {
        type: ADD_TO_CART,
        id
    }
}

//remove item action
export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        id
    }
}
//subtract qt action
export const subtractQuantity = (id) => {
    return {
        type: SUB_QUANTITY,
        id
    }
}
//add qt action
export const addQuantity = (id) => {
    return {
        type: ADD_QUANTITY,
        id
    }
}
export const addInit = (items) => {
    return {
        type: ADD_INIT,
        items
    }
}

//change currency
export const changeCurrency = () => {
    return {
        type: CHANGE_CURRENCY
    }
}

//reset cart state 
export const resetCart = () => {
    return {
        type: RESET_CART
    }
}


