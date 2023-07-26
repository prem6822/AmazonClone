
export const initialState = {
    basket : [],
    user: null,
    searchInp: ""
}

export default function reducer(state, action) {
    switch(action.type){
        case 'ADD_TO_BASKET':
            let currentBasket1 = [...state.basket]
            const index1 = state.basket.findIndex((basketItem) => basketItem.id===action.item.id)
            if(index1<0){
                currentBasket1.push(action.item)
            }
            return {
                ...state,
                basket: currentBasket1
            };
        case 'REMOVE_FROM_BASKET':
            let currentBasket2 = [...state.basket]
            const index2 = state.basket.findIndex((basketItem) => basketItem.id===action.id)
            if(index2>=0){
                currentBasket2.splice(index2,1)
            }else{
                console.warn("Item doesn't exists.");
            }
            return{
                ...state,
                basket: currentBasket2
            };
        case 'CHANGE_QUANTITY':
            let currentBasket3 = [...state.basket]
            const index3 = state.basket.findIndex((basketItem) => basketItem.id===action.id)
            if(index3>=0){
                currentBasket3[index3].quantity = action.quantity
            }else{
                console.warn("Item doesn't exists.");
            }
            return{
                ...state,
                basket: currentBasket3
            };
        case 'SET_USER':
            return{
                ...state,
                user: action.user
            };
        case 'EMPTY_BASKET':
            return{
                ...state,
                basket: []
            };
        case 'CHANGE_SEARCH_INP':
            return{
                ...state,
                searchInp: action.item.inp
            }
        case 'EMPTY_SEARCH_INP':
            return{
                ...state,
                searchInp: action.inp
            }
        default:
            return state;
    }

}
