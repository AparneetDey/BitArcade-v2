import React from 'react'
import { useScreenSize } from '../components/useScreenSize';
import Navbar from '../components/Navbar';
import Search from '../components/Search';

const GamePreview = ({ searchTerm, setSearchTerm, userData }) => {

  const { width, height } = useScreenSize();
  
  return (
    <main>
        <div className={width <= 480 ? 'flex flex-col gap-3' : ''}>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} userData={userData} />

        {width > 480 ? ''
          : <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
      </div>
    </main>
  )
}

export default GamePreview