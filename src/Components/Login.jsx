import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import {login} from '../api';
import '../Styles/login.css';
import toast from 'react-hot-toast'

function Login() {
  const [formData,setFormData]=useState({
    email:'eve.holt@reqres.in',
    password:' cityslicka'
  });
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
 
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try{
      const response=await login(formData);
      if(response.token){
        localStorage.setItem('token',response.token);
        toast.success('Login successful');
        navigate('/users');
      }
      else{
        throw new Error('Invalid response from server');
      }
    }
    catch(error){
     toast.error('Invalid credentials.Please try again.');
     console.error('Login Error: ',error);
    }
    finally{
      setLoading(false);
    }
  }
  
  return (
    <div className='login-container'>
      <div className='login-box'>
        <div className="login-header">
          <LogIn className="login-icon"/>
          <h1>Sign In to your account</h1>
          <p>use the pre-filled credentials to log in</p>
        </div>
        <form className='login-form' onSubmit={handleSubmit}>
               <div className='form-group'>
                  <label htmlFor='email'>Email address</label>
                  <input type='email' id='email' value={formData.email} onChange={(e)=>
                    setFormData({...formData,email:e.target.value})}/>
               </div>
               <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})} />
               </div>
               <button type='submit' disabled={loading} className='login-button'>{loading? 'Signing in...':'Sign in'}</button>
        </form>
      </div>
      
    </div>
  );
}

export default Login;