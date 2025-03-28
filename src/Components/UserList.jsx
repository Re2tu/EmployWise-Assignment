import React, { useEffect, useState } from 'react'
import { Edit2, LogOut, Trash2 } from 'lucide-react';
import { getUsers,deleteUser } from '../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../Styles/display.css';


function Display() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading,setLoading]=useState(true);
  const [currentPage,setCurrentPage]=useState(1);
  const [users,setUsers]=useState([]);
  const [totalPages,setTotalPages]=useState(1);
  const navigate=useNavigate();

  

  async function fetchUsers(page){
    try{
      const res=await getUsers(page);
      setUsers(res.data);
      setLoading(false);
      setTotalPages(res.total_pages);
    }
    catch(error){
      toast.error("Failed to fetch users");
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchUsers(currentPage);
   },[currentPage]);
   
  async function handleDelete(id){
    if(window.confirm('Are you sure you want to delete this user?')){
      try{
        await deleteUser(id);
        setUsers(users.filter((user)=> user.id !== id));
        toast.success('User deleted successfully');
      }
      catch(error){
        toast.error('Failed to delete user');
      }
    }
  }
  function handleLogout(){
    localStorage.removeItem('token');
    navigate('/login');
  }
const filteredUsers=users.filter(
  (user)=>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.email.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className='container'>
      <div className='user-list'>
        <div className='header'>
          <h1>Users</h1>
          <button onClick={handleLogout} className='logout-btn'>
            <LogOut className='icon'/> Logout
          </button>
        </div>

        <input type="text" placeholder='search users...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} 
        className='search-input'/>

        {loading? (<div className='loading'>Loading...</div>):
        (
          <>
          <table className='user-table'>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
{
  filteredUsers.map((user)=>(
    <tr key={user.id}>
      <td><img src={user.avatar} alt={user.first_name} className='avatar'/></td>
      <td>{user.first_name}{user.last_name}</td>
      <td>{user.email}</td>
      <td>
        <button onClick={()=> navigate(`/users/${user.id}/edit`)} className='edit-btn'><Edit2 className='icon'/></button>
        <button onClick={()=>handleDelete(user.id)} className='delete-btn'><Trash2 className='icon'/></button>
      </td>
    </tr>
  ))}
            </tbody>
            </table>

            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`page-btn ${currentPage === page ? "active" : ""}`}
                >
                  {page}
                </button>
              ))}
            </div>
            </>
        )}
      </div>
    </div>
  )
}

export default Display
