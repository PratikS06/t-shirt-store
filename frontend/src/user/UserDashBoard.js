import React from 'react';
import Base from "../core/Base"
import "../styles.css"
import { isAuthenticate } from "../auth/helper/index";
import { Link } from "react-router-dom";

const UserDashBoard = () => {

    const {user: { name,lastname, email, role }} = isAuthenticate();

    const adminRightSide = () => {
        return (
          <div className="card mb-4">
            <h4 className="card-header bg-info">User Information</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <span className="btn btn-primary rounded-circle border-dark mx-2">Name </span>: {name}
              </li>
              <li className="list-group-item">
                <span className="btn btn-primary rounded-circle border-dark mx-2">Email </span>: {email}
              </li>
              <li className="list-group-item">
                <span className="btn btn-primary border-dark rounded-circle mx-2">Role </span>: {role === 1 ? "You are Admin": "You are User" }
              </li>
    
              <li className="list-group-item">
                <span ><Link className="btn btn-success border-dark rounded-pill" to="/">Go To Shopping Page</Link></span>
              </li>
            </ul>
          </div>
        );
      };

    return (
        <Base
        title='Your Profile'
        discription='User details here'
        >
        
        {adminRightSide()}
        
        </Base>

        );
}

export default UserDashBoard;
