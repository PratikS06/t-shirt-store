import React,{Fragment} from 'react';
import {Link,withRouter} from "react-router-dom"
import {signout,isAuthenticate} from "../auth/helper"


const currentTap = (history,path)=>{
        
    if(history.location.pathname === path){
        return {color:"#2ecc72"}
    }else{
        return {color:"#FFFFFF"}
    }

}


const Menu = ({history}) => (


    <div>
        <ul className='nav nav-tabs bg-dark'>
        <li className='nav-item'>
            <Link style={currentTap(history,"/")} className="nav-link"  to="/">Home</Link>
        </li>
        <li className='nav-item'>
            <Link style={currentTap(history,"/cart")} className="nav-link" to="/cart">Cart</Link>
        </li>
        {isAuthenticate() && isAuthenticate().user.role === 0 && (
            <li className='nav-item'>
            <Link style={currentTap(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">U.Dashboard</Link>
        </li>
        )}
        {isAuthenticate() && isAuthenticate().user.role === 1 && (
            <li className='nav-item'>
            <Link style={currentTap(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">A Dashboard</Link>
        </li>
        )}
        {!isAuthenticate() && (
            <Fragment>
                <li className='nav-item'>
            <Link style={currentTap(history,"/signup")} className="nav-link" to="/signup">Signup</Link>
        </li>
        <li className='nav-item'>
            <Link style={currentTap(history,"/signin")} className="nav-link" to="/signin">Signin</Link>
        </li>
            </Fragment>
        )}
        {isAuthenticate() && (
            <li className='nav-item'>
                <span className='nav-link text-warning'
                onClick={()=>{
                    signout(()=>{
                        history.push("/");
                    })
                }}
                >
                    Signout
                </span>
            </li>
        )}
        </ul>
    </div>
)

export default withRouter(Menu);
