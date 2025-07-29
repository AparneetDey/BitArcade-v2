import React from 'react'
import { useScreenSize } from '../components/useScreenSize';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import { useLoaderData } from 'react-router';

const GamePreview = ({ searchTerm, setSearchTerm, userData }) => {
  const { width, height } = useScreenSize();

  const game = useLoaderData();
  console.log(game)
  const { name, background_image, rating } = game;

  return (
    <main>
      <div className={width <= 480 ? 'flex flex-col gap-3' : ''}>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} userData={userData} />

        {width > 480 ? ''
          : <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
      </div>

      <section className='flex flex-col gap-[32px] px-4 md:px-10'>
        <div className='flex flex-col gap-auto md:flex-row'>
          <h2>{name ? name : 'NA'}</h2>
          <div className=' flex'>
            <div className=' flex items-center justify-center bg-[#579ED5] border-[#366183] border-2 rounded-[10px] gap-1 px-2 py-1 '>
              <img className='w-[15px] h-[15px]' src="/Star.png" alt="Star icon" />
              <p className='text-white text-[14px]'>{rating > 0 ? rating : 'N/A'}/5</p>
            </div>
            <div>
              A
            </div>
          </div>
        </div>

        <div className='aspect-[4/2] w-full md:aspect-[6/2] rounded-2xl shadow-[0_5px_15px_0px_rgba(255,255,255,0.4)] '>
          <img className='w-full h-full object-cover rounded-2xl ' src={background_image ? background_image : '/mo-poster.png'} alt={name ? name : 'Game Name'} />
        </div>
      </section>
    </main>
  )
}

export default GamePreview