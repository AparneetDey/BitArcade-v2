import React from 'react'
import Navbar from '../components/Navbar'

const Profile = ({ searchTerm, setSearchTerm, userData }) => {
  return (
    <main>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} userData={userData} searchBar={false} />

      <section className='px-4 md:px-10'>
        <div className='flex justify-center items-center md:justify-start md:items-start '>
          <div className='flex flex-col gap-4 justify-center items-center'>
            <div className='profile-pic'>
              <img src="/profile-icon.png" alt="Profile Icon" />
            </div>
            <h2 className='flex gap-2'>{userData.username}<img className='cursor-pointer' src="/edit-pencil.svg" alt="" /></h2>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Profile