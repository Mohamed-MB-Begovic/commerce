/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {createContext, useEffect,useContext, useReducer } from "react";
import ShopReducer,{ initialState} from "../ShopReducer";
import shopReducer from "../ShopReducer";
export const shopContext=createContext(initialState)


export const ShopProvider=({children})=>{
    const [state,dispatch]=useReducer(shopReducer,initialState)
    
    // console.log(initialState)
    // 
    useEffect(()=>{
        localStorage.setItem('cart-items',JSON.stringify({total:state.total,products:state.products,user:state.user}))
    },[state])

    const calculateTotal=(products)=>{
        let total=0;
    products.forEach(product=>{
        total+=product.price * product.quantity
    })

    dispatch({type:'CalculateTotal',payload:{
        total
    }})


       
    }

    const AddToCart=(product,user,quantity,size)=>{
        let updatedProducts=[...state.products]
        const productIndex=state.products.findIndex((p)=>p._id===product._id)
        if(productIndex===-1){
            // console.log('the old product')
            updatedProducts=[
                ...updatedProducts,
                {
                    ...product,
                    quantity:quantity,
                    size,
                    user,
                }
            ]
        }else{
            // console.log('update quantity')
          updatedProducts[productIndex]={
            ...updatedProducts[productIndex],
            quantity:updatedProducts[productIndex].quantity+1
          }
        }

        calculateTotal(updatedProducts);
        dispatch({type:'ADD_TO_CART',payload:{
            products:updatedProducts
        }})
    }

    const updateQuantity=(newQuantity,product)=>{
        let updatedProducts=[...state.products]
        const productIndex=state.products.findIndex((p)=>p._id===product._id)
        updatedProducts[productIndex]={
            ...updatedProducts[productIndex],
            quantity:newQuantity
        }
        // console.log(updatedProducts)
        calculateTotal(updatedProducts);
        dispatch({
            type:'UPDATE_QUANTITY',
            payload:{
               products: updatedProducts
            }
        })
    }

    const removeFromCart=(product)=>{
        let updatedProducts=[...state.products]
        const productIndex=state.products.findIndex((p)=>p._id===product._id)
        const removedProduct=updatedProducts[productIndex]
        updatedProducts=updatedProducts.filter((p)=>p._id!==product._id)
        // console.log("updatedProducts",updatedProducts)
        calculateTotal(updatedProducts)
        dispatch({type:'REMOVE_FROM_CART',payload:{
            products:updatedProducts
        }})
    }



const value={
    products:state.products,
    AddToCart,
    total:state.total,
    updateQuantity,
    removeFromCart
}


    return <shopContext.Provider value={value}>
        {children}
    </shopContext.Provider>
}

export const useShopContext=()=>{
    return useContext(shopContext)
}