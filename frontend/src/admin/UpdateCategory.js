import React, { useState,useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticate } from "../auth/helper";
import { Link, Redirect } from "react-router-dom";
import { getCategory,updateCategory } from "./helper/adminapicall";



const UpdateCategory = ({match}) => {
  
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);
  
  
  const {user,token} = isAuthenticate();

  const preload =categoryId =>{
    getCategory(categoryId).then(data=>{
      if (data.error) {
        setError(true)
      }else{
        setName(data.name)
      }
    })
  }
  
  useEffect(() => {
    preload(match.params.categoryId)
  }, []);

  const handleChange=event=>{
    setError("")
    setName(event.target.value)
  }

  const onSubmit=event=>{
    event.preventDefault()
    setError("")
    
    //updation Request Fire
    updateCategory(match.params.categoryId,user._id,token,{name}) //using {} coz in body we Are Passing JSON.stringify(category) 
    .then(data=>{
      if (data.error) {
        setError(true)
      }
      else{
        setError("")
        setSuccess(true)
        setName("")
        setRedirect(true)
        
      }
    })
    
  }

 const autoRedirect = ()=>{
  if (redirect) {
    setTimeout(() => {
      return window.location.href="/admin/categories"
    }, 2000);
  }
 }


  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Updated successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
        return <h4 className="text-dark">Failed to create Product! :<span>{error}</span>
        <p>{console.log(error)}</p>
        </h4>;
        
      }
  };
  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-2 rounded-pill" to="/admin/dashboard">
        Admin Home
      </Link>
      <Link className="btn btn-sm btn-success mx-2 mb-2 rounded-pill " to="/admin/categories">
        Go Back
      </Link>
    </div>
  )
  
  const myCategoryForm = () => (
    <form>
            <div className='form-group'>
                <p className='lead bg-info mt-2 rounded-circle text-center' >Enter New Category</p>
                <input className='form-control my-3 '
                autoFocus
                placeholder='for ex.summer'
                value={name}
                required
                onChange={handleChange}
                />
                
                <button className='btn btn-outline-info text-dark rounded-pill my-2 '
                onClick={onSubmit}
                >Update Category</button>
                
            </div>
        </form>
    
  );
  
  return (
    <Base
      title="Update a Category here"
      discription="Add a new Category for new tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
          {autoRedirect()}
          
          
        </div>
      </div>
    </Base>
  );
}

export default UpdateCategory;
