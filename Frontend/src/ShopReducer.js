 const user=JSON.parse(localStorage.getItem('user'))
//  const products=JSON.parse(localStorage.getItem('cart-items'))
 
 export const initialState=!user ?{
    products:[],
    total:0,
    size:"",
    user:{}
 }:JSON.parse(localStorage.getItem('cart-items')) || {
    products:[],
    total:0,
    user:{}
 }

 const shopReducer=(state,action)=>{
    const {type,payload}=action;
    switch(type){
    case 'ADD_TO_CART' :
        return {
            ...state,
            products:payload.products,
            size:payload.size,
            user:payload.user
        }
        case 'CalculateTotal':
            return{
                ...state,
                total:payload.total
            }
            case 'UPDATE_QUANTITY':
                return{
                    ...state,
                    products:payload.products
                }

            case 'REMOVE_FROM_CART':
                return{
                    ...state,
                    products:payload.products
                }
 }}

 export default shopReducer