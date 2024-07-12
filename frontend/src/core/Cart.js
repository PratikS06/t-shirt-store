import React,{useState,useEffect} from 'react';
import "../styles.css"
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { loadProduct } from './helper/CartHelper';
import StripeCheckOut from './StripeCheckOut';


const Cart = () => {

    const [product, setProduct] = useState([]);

    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProduct(loadProduct())
    }, [reload]);

    const loadAllProducts=() =>{
        return(
            <div>
                <h2>Your Cart Products</h2>
                {product.map((product,index)=>{
                    return(
                        <Card
                        key={index}
                        product={product}
                        addToCart={false}
                        removeFromCart={true}
                        reload={reload}
                        setReload={setReload}
                        />
                    )
                })}
            </div>
        )
    } 
    
    const loadCheckout=() =>{
        return(
            <StripeCheckOut
                product={product}
                setReload={setReload}
                reload={reload}
                />
        )
    } 

    
  
    return (
            <Base title='Cart Page ' discription='Welcome To T-Shirt Store'>
            <div className='row text-center cartBody mb-2' >
                <div className='col-3  '>{loadAllProducts()}</div>  
                  
                <div className='col-9'>{loadCheckout()}</div>  
               </div>
            
            </Base>        
    );
}

export default Cart;
