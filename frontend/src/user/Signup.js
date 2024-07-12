import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';
import Base from '../core/Base';


const Signup = () => {
  
const [values,setValues] = useState({
  name:"",
  lastname:"",
  email:"",
  password:"",
  error:"",
  success:""
})   

const {name,lastname,email,password,error,success} = values

const handleChange=name=>event=>{
  setValues({...values,error:false,[name]:event.target.value})
}

const onSubmit = event=>{
  event.preventDefault()
  setValues({...values,error:false})
  signup({name,lastname,email,password})
  .then(data=>{
    if(data.error){
      setValues({...values,error:data.error,success:false})
    }else{
      setValues({
        ...values,
        name:"",
        lastname:"",
        email:"",
        password:"",
        error:"",
        success:true
      })
    }
  })
  .catch(console.log("Error With SignUp"))
  
}

const successMessage = ()=>{
  return(
    <div className="row justify-content-center">
    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

    
    <div className='alert alert-success'
  style={{display: success ? "" : "none"}}
  >
    Your New Account Created Successfully Please <Link to="/signin">Signin</Link>Login Here
  </div>
  </div>
  </div>
  
  )
}
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


  const signupForm = ()=>{
    return(
      <section className="container-fluid " >
<div className="container h-100">
  <div className="row d-flex justify-content-center align-items-center h-100">
    <div className="col-lg-12 col-xl-11">
      <div className="card text-black br-25" >
        <div className="card-body p-md-5">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign Up</p>

              <form className="mx-1 mx-md-4">

              <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">
                    <input onChange={handleChange("name")} type="text" value={name} className="form-control" />
                    <label className="form-label">Your Name</label>
                  </div>
                </div>
              <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">
                    <input onChange={handleChange("lastname")} type="text" value={lastname} className="form-control" />
                    <label className="form-label">Your Last Name</label>
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">
                    <input onChange={handleChange("email")} type="email" value={email} className="form-control" />
                    <label className="form-label">Your Email</label>
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">
                    <input onChange={handleChange("password")} type="password" value={password} className="form-control" />
                    <label className="form-label" >Password</label>
                  </div>
                </div>

                

                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                  <button onClick={onSubmit} type="button" className="btn btn-primary btn-lg rounded">Create Account</button>
                </div>
                <div class="container signin">
                  <p >Already have an account? <Link to="/signin">Signin</Link></p>
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
    )
  }
  
return (
      <Base className='min-vh-100' title='Signup Page' discription=""  >
        {successMessage()}
        {errorMessage()}
        {signupForm()}
        <p className='text-white'>{JSON.stringify(values)}</p>
     </Base>
    );
}

export default Signup;
