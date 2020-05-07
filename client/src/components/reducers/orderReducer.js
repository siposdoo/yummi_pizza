import { getAll } from '../actions/cartActions'


import { RESET_CART, SUB_SHIPPING, ADD_INIT, ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING, CHANGE_CURRENCY } from '../actions/action-types/cart-actions'

let allData = []
getAll().then((result) => {
    return result
}).then((result) => {
    result.map(item => {
        allData.push(item)
    })
})


let initState = {
    showCheckout: false,
    it: [],
    items: allData,

    addedItems: [],
    total: 0,
    curr: 0

}




const orderReducer = (state = initState, action) => {

    //INSIDE HOME COMPONENT
    if (action.type === ADD_TO_CART) {
        let addedItem = state.items.find(item => item.id === action.id)
        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => action.id === item.id)
        if (existed_item) {
            addedItem.quantity += 1
            return {
                ...state,
                total: state.total + addedItem.price
            }
        }
        else {
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price

            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal
            }

        }
    }
    if (action.type === ADD_INIT) {
        let itemsToAdd = action.items;
        return {
            ...state,
            items: itemsToAdd

        }
    }
    if (action.type === REMOVE_ITEM) {
        let itemToRemove = state.addedItems.find(item => action.id === item.id)
        let new_items = state.addedItems.filter(item => action.id !== item.id)

        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
        console.log(itemToRemove)
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if (action.type === ADD_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        addedItem.quantity += 1
        let newTotal = state.total + addedItem.price
        return {
            ...state,
            total: newTotal
        }
    }
    if (action.type === SUB_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        //if the qt == 0 then it should be removed
        if (addedItem.quantity === 1) {
            let new_items = state.addedItems.filter(item => item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                total: newTotal
            }
        }

    }
    if (action.type === ADD_SHIPPING) {
        return {
            ...state,
            total: state.total + 6
        }
    }
    if (action.type === CHANGE_CURRENCY) {
        let newCurr = 0;
        if (state.curr === 0) {
            newCurr = 1;
        }
        return {
            ...state,
            curr: newCurr
        }
    }

    if (action.type === SUB_SHIPPING) {
        return {
            ...state,
            total: state.total - 6
        }
    }
    if (action.type === RESET_CART) {
        return {
            ...state,
            showCheckout: false,
    it: [],
    items: allData,

    addedItems: [],
    total: 0,
    curr: 0
        }
    }

    else {
        return state
    }

}

export default orderReducer
