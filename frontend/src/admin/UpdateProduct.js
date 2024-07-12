import React,{useState,useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticate } from '../auth/helper';
import Base from '../core/Base';
import { getCategories ,updateProduct,getProduct} from './helper/adminapicall';


const UpdateProduct = ({match}) => {
    const { user, token } = isAuthenticate();

    const [values, setValues] = useState({
      name: "",
      discription: "",
      price: "",
      stock: "",
      photo: "",
      categories: [],
      category: "",
      loading: false,
      error: "",
      createdProduct: "",
      getaRedirect: false,
      formData: ""
    });
  
    const {
      name,
      discription,
      price,
      stock,
      categories,
      category,
      loading,
      error,
      createdProduct,
      getaRedirect,
      formData
    } = values;
    
    const preload = (productId) => {
        getProduct(productId).then(data => {
          
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({ 
                ...values, 
                name:data.name,
                discription:data.discription,
                price:data.price,
                stock:data.stock,
                category:data.categoryId,
                formData: new FormData()
             });
             preloadCategories()
          }
        });
      };

      const preloadCategories=()=>{
        getCategories().then(data=>{
            if (data.error) {
            setValues({ ...values, error: data.error });
                
            }else{
                setValues({
                categories:data,
                formData: new FormData()
                })

            }
        })
      }
    
      useEffect(() => {
        preload(match.params.productId);
      }, []);
    
      const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        updateProduct(match.params.productId,user._id, token, formData).then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              name: "",
              discription: "",
              price: "",
              photo: "",
              stock: "",
              loading: false,
              createdProduct: data.name,
              getaRedirect:true
            });
          }
        });
        
      };


      const autoRedirect = ()=>{
        if (getaRedirect) {
          setTimeout(() => {
            return window.location.href="/admin/products"
          }, 2000);
        }
       }
     
    
      const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
      };
    
      const successMessage = () => (
        <div
          className="alert alert-success mt-3"
          style={{ display: createdProduct ? "" : "none" }}
        >
          <h4>{createdProduct} Updated successfully</h4>
        </div>
      );
    
    const errorMessage = () => {
        if (error) {
          return <h4 className="text-dark">Failed to create Product! :<span>{error}</span></h4>;
        }
      };
    

    const UpdateProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success mb-2 rounded">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group mb-2">
            <textarea
              onChange={handleChange("discription")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={discription}
            />
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group mb-2">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
                {categories && 
                categories.map((cate,index)=>(
              <option key={index} value={cate._id}>{cate.name}</option>
                ))
                }              
            </select>
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-2 rounded">
            Update Product
          </button>
        </form>
      );
    
    return (
        <Base title='|| Update T-Shirts ||' discription='Update Your T-Shirts'
        className='container bg-info p-4'>
        {successMessage()}
        {errorMessage()}
        {UpdateProductForm()}
        {autoRedirect()}
        
        

<div className='text-center'>
<Link to="/admin/dashboard" className='btn btn-danger btn-sm mt-3 rounded-pill'>Admin Home</Link>

</div>
        <div className='row bg-dark text-white rounded'>
            <div className='col-md-8 offset-md-2'>
                
            </div>

        </div>
        </Base>
    );
}

export default UpdateProduct;
