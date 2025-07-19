import React from 'react'
import Navbar from '../components/Navbar'

const Profile = ({searchTerm, setSearchTerm, userData}) => {
  return (
    <div>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} userData={userData} searchBar={false} />
    </div>
  )
}

export default Profile