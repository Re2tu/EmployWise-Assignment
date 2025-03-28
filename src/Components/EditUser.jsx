import React, { useState,useEffect } from 'react'
import {ArrowLeft, Save} from 'lucide-react';
import '../Styles/edituser.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsers, updateUser } from '../api';
import toast from 'react-hot-toast';

function EditUser(){
  const {id}=useParams();
  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    first_name:'',
    last_name:'',
    email:'',
  });
const [loading,setLoading]=useState(true);


  useEffect(()=>{
   fetchUser();
  },[id]);

  async function fetchUser(){
    try{
       const response=await getUsers();
       const user=response.data.find((user)=>user.id===Number(id));
       if(user){
          setFormData({
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email
          });
       }
       setLoading(false);
    }
    catch(error){
      toast.error('Failed to fetch user');
      setLoading(false);
    }  }

  async function handleSubmit(e){
    e.preventDefault();
    try{
      await updateUser(Number(id),formData);
      toast.success('User updated successfully');
      navigate('/users');
    }
    catch(error){
      toast.error('Failed to update user');
      console.error('Update User Error: ',error);
    }
  }
  if(loading){
    return <div className='loading'>loading...</div>
  }
  return (
    <div className='edit-user-container'>
      <div className='edit-user-box'>
        <div className='edit-user-header'>
      <button onClick={()=> navigate('/users')} className='back-button'><ArrowLeft className='icon'/></button>
      <h1>Edit User</h1>
        </div>
        <form onSubmit={handleSubmit} className='edit-user-form'>
          <div className='form-group'>
            <label htmlFor='first_name' >First Name</label>
            <input type='text' id='first_name' value={formData.first_name} onChange={(e)=>setFormData({...formData,first_name:e.target.value})} required/>
          </div>
          <div className='form-group'>
            <label htmlFor='last_name'>Last Name</label>
            <input type='text' id='last_name' value={formData.last_name} onChange={(e)=>setFormData({...formData,last_name:e.target.value})} required/>
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} required/>
          </div>
          <div className='form-actions'>
          <button type='submit' className='save-button'><Save className='icon'/>Save Changes</button>
          </div>
        </form>
      </div>
      
    </div>
  )
}

export default EditUser
