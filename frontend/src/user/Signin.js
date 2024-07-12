import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import {signin,isAuthenticate,authenticate} from "../auth/helper/index"
const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticate();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard"/>;
      } else {
        return <Redirect to="/user/dashboard"/>;
      }
    }
    if (isAuthenticate()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = ()=>{
    return(
      <div className="row justify-content-center">
      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
  
      <div className='alert alert-danger'
    style={{display: error ? "" : "none"}}
    >
      {error}
    </div>
    </div>
    </div>
    
    )
  }
  

  const signInForm = () => {
    return (
      <section className="container-fluid " >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black br-25" >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
    
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Signin</p>
    
                    <form className="mx-1 mx-md-4">
    
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input value={email} onChange={handleChange("email")}  type="email"  className="form-control" />
                          <label className="form-label">Your Email</label>
                        </div>
                      </div>
    
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input value={password} onChange={handleChange("password")}  type="password"  className="form-control" />
                          <label className="form-label" >Password</label>
                        </div>
                      </div>
    
                      
    
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button onClick={onSubmit} type="button" className="btn btn-primary btn-lg rounded">Login</button>
                      </div>
    
                    </form>
    
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2" >
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    className='img-fluid'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
  };

  return (
    <Base className='min-vh-100' title="Sign In page" discription="A page for user to sign in!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
