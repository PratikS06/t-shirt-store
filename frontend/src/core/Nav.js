import React,{Fragment} from 'react';
import { Link,withRouter, } from 'react-router-dom';
import { isAuthenticate, signout } from '../auth/helper';


const currentTab =(history,path)=>{
    if(history.location.pathname===path){
        return {color:"#2ecc72"}
    }else{
        return{color:"#FFFFFF"}
    }
}

const Nav = ({history}) => {
    return (
        <div >
            <ul className="nav nav-tabs bg-dark ">
                <li className='nav-item'>
                    <Link style={currentTab(history ,"/")} className='nav-link' to="/">Home</Link>
                </li>
                <li className='nav-item'>
                    <Link style={currentTab(history ,"/cart")}className='nav-link' to="/cart">Cart</Link>
                </li>
                {isAuthenticate() && isAuthenticate().user.role === 0 && (<li className='nav-item'>
                    <Link className='nav-link'style={currentTab(history ,"/user/dashboard")} to="/user/dashboard">Dashboard</Link>
                </li>)}
                
                {isAuthenticate() && isAuthenticate().user.role === 1 && (
                    <li className='nav-item'>
                    <Link style={currentTab(history ,"/admin/dashboard")} className='nav-link' to="/admin/dashboard">A.Dashboard</Link>
                </li>
                ) }

                {!isAuthenticate() && (
                    <React.Fragment>
                    <li className='nav-item'>
                        <Link style={currentTab(history ,"/signup")} className='nav-link' to="/signup">Signup</Link>
                    </li>
                    <li className='nav-item'>
                        <Link style={currentTab(history ,"/signin")} className='nav-link' to="/signin">Signin</Link>
                    </li>    
                    </React.Fragment>
                )}
                {isAuthenticate() && (
                    <li className='nav-item'>
                    <button
                    className='nav nav-link text-warning'
                    onClick={()=>{
                        signout(()=>{
                            history.push("/")
                        })
                    }}
                    >Signout</button>
                </li>
                )}
            </ul>
        </div>
    );
}

export default withRouter(Nav);
