import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL;

const Profile = ({ searchTerm, setSearchTerm, userData }) => {
  const navigate = useNavigate();

  const [logOut, setLogOut] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const handleLogOut = async (actionType) => {
    try {
      navigate('/');
      window.location.reload()

      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'logout' }), // <-- "logout" or "delete"
      });
    } catch (error) {
      console.log(`Error in Logging out: ${error}`);
    }
  }

  useEffect(() => {
    if (logOut) {
      handleLogOut('logout')
      setLogOut(!logOut);
    } if (deleteAccount) {
      handleLogOut('delete')
      setDeleteAccount(!deleteAccount);
    }
  }, [logOut, deleteAccount]);


  return (
    <main>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} userData={userData} searchBar={false} />

      <section className='px-4 md:px-10'>
        <div className='profile-info'>
          <div className='position'>
            <div className='profile-pic'>
              <img src="/profile-icon.png" alt="Profile Icon" />
            </div>
            <div className='data'>
              <h2>{userData.username}</h2>
              <p className='text-white text-[18px]'>{userData.email}</p>
              <button onClick={(e) => setLogOut(!logOut)} className='hover:bg-[#fff] hover:text-[#000]'>Log out</button>
              <button onClick={(e) => setDeleteAccount(!deleteAccount)} className='hover:bg-[red] hover:border-[red]'>Delete Account</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Profile