import React,{useState,useEffect} from 'react';
import ImageHelper from './helper/ImageHelper';
import {Redirect} from 'react-router-dom'
import { addItemToCart, removeItem } from './helper/CartHelper';

const Card = ({product,addToCart=true,removeFromCart=false,setReload=f=>f,reload=undefined }) => {

  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

    const cardTitle = product ? product.name : "A photo from pexels"
    const cardDescrption = product ? product.discription : "A photo from pexels"
    const cardPrice = product ? product.price : "A photo from pexels"

    const addProductToCart = ()=>{
      addItemToCart(product,()=> setRedirect(true))
    }

    const getARedirect =(redirect)=>{
      if (redirect) {
        return <Redirect to ="/cart"/>
      }
    }

    const ShowAddToCart = (addToCart)=>{
        return(
            addToCart && (
                <button
                onClick={addProductToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
            )
        )

    }
    
    const ShowRemoveFromCart = (removeFromCart)=>{
        return(
            removeFromCart && (
                <button
                onClick={() => {
                  removeItem(product._id)
                  setReload(!reload);
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            )
        )
    }

    return (
        <div >
        <div className="card text-white bg-dark border border-info " >
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
          <ImageHelper product={product} />
          {getARedirect(redirect)}
          <p className="lead bg-success font-weight-normal text-wrap rounded my-2 mb-3">
            {cardDescrption}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">{cardPrice} ₹</p>
          <div className="row">
            <div className="col-12">
              {ShowAddToCart(addToCart)}
            </div>
            <div className="col-12">
              {ShowRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
        </div>
    );
}

export default Card;
