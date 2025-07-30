import React, { useEffect, useState } from 'react'
import { useScreenSize } from '../components/useScreenSize';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import { useParams } from 'react-router';
import Spinner from '../components/Spinner';

const API_URL = import.meta.env.VITE_API_URL;

const GamePreview = ({ searchTerm, setSearchTerm, userData, isSignedIn }) => {

  const [errorMessage, setErrorMessage] = useState('')
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const { slug } = useParams();
  const { width, height } = useScreenSize();
  const heartImg = saved ? '/active-heart.svg' : '/inactive-heart.svg';


  const fetchGame = async () => {
    setIsLoading(true);
    setErrorMessage('')

    try {
      const response = await fetch(`${API_URL}/gameSlug?slug=${slug}`);

      if (!response.ok) {
        throw new Error('Response not okay');
      }

      const data = await response.json();

      if (Object.keys(data).length === 0) {
        setGame({});
        setErrorMessage('Sorry! The game can not be loaded!');
        return 0;
      }

      console.log(data);

      setGame(data);
    } catch (error) {
      console.log(`Error fetching game: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGame()
  }, [slug])


  const { name, background_image, rating } = game;

  return (
    <main>
      <div className={width <= 480 ? 'flex flex-col gap-3' : ''}>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} userData={userData} />

        {width > 480 ? ''
          : <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
      </div>

      {isLoading ? <div className='flex justify-center items-center'><Spinner /></div> :
        (
          <section className='game-preview'>
            <div className='header'>

              <h2>{name ? name : 'NA'}</h2>

              <div className=' flex gap-2'>

                <div className=' icon ' title='Ratings'>  {/* Rating */}
                  <p className='text-white text-[14px]'>{rating > 0 ? `${rating}/5` : 'N/A'}</p>
                </div>

                {isSignedIn ? (
                  <div className='icon cursor-pointer' onClick={(e) => setSaved(!saved)} title='Favourite' >  {/* Save */}
                    <img className='w-5 h-5 object-cover' src={heartImg} alt="Heart Icon" />
                  </div>
                ) : ''}

              </div>

            </div>

            <div className='poster'>
              <img src={background_image ? background_image : '/no-poster.png'} alt={name ? name : 'Game Name'} />
            </div>

            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

          </section>

        )}

    </main>
  )
}

export default GamePreview