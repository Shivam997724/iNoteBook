import  React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
    const [credensial,setCredensial] =useState({name:"",email:"",password:"",cpassword:""});
    let history = useNavigate()
    const {name,email,password}=credensial;
     const handleSubmit= async(e)=>{
         e.preventDefault()
         const response = await fetch("http://localhost:5000/api/auth/createuser", {
             method: "POST", // *GET, POST, PUT, DELETE, etc.
             headers: {
               "Content-Type": "application/json",
               
               // 'Content-Type': 'application/x-www-form-urlencoded',
             },  
          // body data type must match "Content-Type" header
          body:JSON.stringify({name,email,password})
           });
           const json = await response.json()
           console.log(json);
           if(json.success){
             localStorage.setItem('token',json.authtoken);
             history("/")
             props.showAlert("Account Created Successfully","success")
           }
           else{
            props.showAlert("invalid credencials","danger")
           }
     }
     
     const handleChange = (e) => {
         setCredensial({ ...credensial, [e.target.name]: e.target.value })
       }
  return (
    <div>
      <h1 className='text-center my-3'>Create account using Inotebook</h1>
   <form onSubmit={handleSubmit} className='container w-50'>
  <div className="mb-3">
    <label for="name" className="form-label">Full Name</label>
    <input type="text" className="form-control"value={credensial.name} onChange= {handleChange}id="name" name='name'  />
  </div>
  <div className="mb-3">
    <label for="email" className="form-label">Email address</label>
    <input type="email" className="form-control"value={credensial.email} onChange= {handleChange}id="email" name='email' aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="password" className="form-label">Password</label>
    <input type="password" className="form-control"value={credensial.password} onChange= {handleChange}id="password" name='password' minLength={5} required/>
  </div>
  <div className="mb-3">
    <label for="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" value={credensial.cpassword}  name='cpassword'  id="cpassword" onChange={handleChange} />
  </div>

  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Signup