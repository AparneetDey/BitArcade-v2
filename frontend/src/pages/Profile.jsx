import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router';
import { useScreenSize } from '../components/useScreenSize';
import Search from '../components/Search';
import ScrollToTop from '../components/ScrollToTop';
import authservice from '../appwrite/auth';
import Spinner from '../components/Spinner';


const API_URL = import.meta.env.VITE_API_URL;

const Profile = ({ searchTerm, setSearchTerm, userData, debouncedSearchTerm }) => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logOut, setLogOut] = useState(false);

  const handleLogOut = async () => {
    setIsLoading(true)
    setErrorMessage('');

    try {
      const logOut = await authservice.logOut();

      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logout: logOut }),
      });

      if (!response.ok) {
        throw new Error('Response is not okay');
      }

      const data = await response.json();

      if (data.result) {
        navigate('/');
        window.location.reload()
        return;
      }

      setErrorMessage('Not able to logout right now.')
    } catch (error) {
      console.log(`Error in Logging out: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (logOut) {
      handleLogOut()
      setLogOut(!logOut);
    }
  }, [logOut]);

  useEffect(() => {
    if (!hasMounted) return;

    if (searchTerm) {
      navigate('/');
    }
  }, [debouncedSearchTerm, hasMounted]);

  useEffect(() => {
    setHasMounted(true);
  }, [])

  const { width, height } = useScreenSize();

  return (
    <main>
      <ScrollToTop />

      <div className={width <= 480 ? 'flex flex-col gap-3' : ''}>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} userData={userData} />

        {width > 480 ? ''
          : <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
      </div>

      <section className='px-4 md:px-10'>
        <div className='profile-info'>
          <div className='position'>
            <div className='profile-pic'>
              <img src="/profile-icon.png" alt="Profile Icon" />
            </div>
            <div className='data'>

              <h2>{userData.name}</h2>

              <p className='text-white text-[18px]'>{userData.email}</p>

              {errorMessage ? (<p className='text-red-500'>{errorMessage}</p>) : ''}

              <button onClick={(e) => setLogOut(!logOut)} className='hover:bg-[#fff] hover:text-[#000]'>
                {isLoading ? (<Spinner />) : 'Log Out'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Profile