import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';
  

const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [redirect, setRedirect] = useState(false);


    const {user,token} = isAuthenticate()

    const handleChange = (event)=>{
        setError("")
        setName(event.target.value)
    }
    const onSubmit = (event)=>{
        event.preventDefault()
        setError("")
        setSuccess(false)

        //backend Fired Here
        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error){
                setError(true)

            }else{
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
          return (
          
            <h4 className="text-success">Category created successfully</h4>
            )
        }
    };
    
      const warningMessage = () => {
        if (error) {
          return <h4 className="text-success">Failed to create category</h4>;
        }
      };
      
    const goBack = ()=>(
        <div className='mt-5'>
            <Link to="/admin/dashboard"
            className='btn btn-primary btn-sm mb-2 rounded-pill'
            >
            Admin Home
            </Link>
        </div>
    )

    const myCategoryForm = ()=>(
        <form>
            <div className='form-group'>
                <p className='lead bg-info mt-2 rounded-circle text-center' >Enter New Category</p>
                <input className='form-control my-3 '
                autoFocus
                placeholder='for ex.summer'
                required
                onChange={handleChange}
                />
                
                <button className='btn btn-outline-info text-dark rounded-pill my-2 '
                onClick={onSubmit}
                >Create Category</button>
                
            </div>
        </form>
    )

    return (
        <Base title='Create Category Page' discription='New Categories Created Here For New T-Shirts'
        className='container bg-info p-4 border-dark rounded'
        >
        <div className='row bg-white rounded'>
            <div className='col-md-8 offset-md-2'>
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

export default AddCategory;
