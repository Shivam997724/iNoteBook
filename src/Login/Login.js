import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credensial,setCredensial] =useState({email:"",password:""});
   let history = useNavigate()
    const handleSubmit= async(e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },  
         // body data type must match "Content-Type" header
         body:JSON.stringify({email:credensial.email,password:credensial.password})
          });
          const json = await response.json()
          console.log(json);
          if(json.success){
            localStorage.setItem('token',json.authtoken);
            history("/")
            props.showAlert("Logged In Successfully","success")
          }
          else{
            props.showAlert("Invalid Details","danger") 
          }
    }
    
    const handleChange = (e) => {
        setCredensial({ ...credensial, [e.target.name]: e.target.value })
      }

  return (
    <div>
      <h1 className='text-center my-4'>Login to contine </h1>
        <form onSubmit={handleSubmit} className='container w-50'>
  <div className="mb-3">
    <label for="email" className="form-label">Email address</label>
    <input type="email" className="form-control"value={credensial.email} onChange= {handleChange}id="email" name='email' aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credensial.password}  name='password'  id="password" onChange={handleChange} />
  </div>

  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login