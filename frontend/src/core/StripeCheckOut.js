import React,{useState,useEffect} from 'react';
import { isAuthenticate } from '../auth/helper';
import {cartEmpty, loadProduct } from "./helper/CartHelper";
import {Link,Redirect} from "react-router-dom"
import StripeCheckOutButton from "react-stripe-checkout"

const StripeCheckOut = ({product,setReload=f=>f,reload=undefined} ) => {
    
    const [data, setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    });

    const token = isAuthenticate() && isAuthenticate().token
    const userId = isAuthenticate() && isAuthenticate().user._id
    
    const getFinalPrice = ()=>{
        let amount = 0;
        product.map((p)=>{
            amount = amount + p.price;
        })
        return amount
    }
    
    const showStripeButton = ()=>{
        return isAuthenticate() ? (
            <StripeCheckOutButton
            stripeKey=''
            token=""
            amount={getFinalPrice() * 100}
            name='Buy T-Shirts'
            shippingAddress
            billingAddress
            >
            <button className='btn btn-success rounded' >Pay With Stripe</button>
            </StripeCheckOutButton>
        ):
        (<Redirect to="/signin"/>)
        // (<Link className="btn btn-warning rounded" to = "/signin" >Signin</Link>)
    }

    return (
        <div>
            <h2>|| Stripe Checkout ||</h2>
            <h2>Total Amount Of Products : {getFinalPrice()} Rs</h2>
            {showStripeButton()}
        </div>
    );
}

export default StripeCheckOut;
