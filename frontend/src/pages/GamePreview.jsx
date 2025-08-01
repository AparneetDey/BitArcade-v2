import React, { useEffect, useState } from 'react'
import { useScreenSize } from '../components/useScreenSize';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import Spinner from '../components/Spinner';
import GameDetails from '../components/GameDetails';
import ScrollToTop from '../components/ScrollToTop';
import Game from '../components/Game';

const API_URL = import.meta.env.VITE_API_URL;

const API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const GameLoader = async ({ params }) => {
  const { slug } = params

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

    return data;
  } catch (error) {
    console.log(`Error fetching game: ${error}`);
  }
}

const GamePreview = ({ searchTerm, setSearchTerm, userData, isSignedIn, debouncedSearchTerm }) => {
  const game = useLoaderData();

  const [errorMessage, setErrorMessage] = useState('');
  const [gamesErrorMessage, setGamesErrorMessage] = useState('');
  const [hasMounted, setHasMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState(false);
  const [similarGamesList, setSimilarGamesList] = useState([]);

  const fetchSimilarGame = async () => {
    setIsLoading(true);
    setGamesErrorMessage('');

    const index = getRandomInt(0,game.genres.length-1);

    try {
      const endpoint = `${API_URL}/similargames?genre=${game.genres[index].slug}`;

      const response = await fetch(endpoint, API_OPTION);

      if (!response.ok) {
        throw new Error('Error fetching game!');
      }

      const data = await response.json();

      if (data.results.length === 0) {
        setGamesErrorMessage(data.error || 'Games not found!');
        setSimilarGamesList([]);
        return;
      }

      const uniqueGames = data.results.filter(g => g.id !== game.id);

      setSimilarGamesList(uniqueGames.slice(0,6));

    } catch (error) {
      console.log(`Error fetcing games: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  const { width, height } = useScreenSize();
  const heartImg = saved ? '/active-heart.svg' : '/inactive-heart.svg';
  const navigate = useNavigate();

  const { name, background_image, rating, ratings_count } = game;

  useEffect(() => {
    setHasMounted(true);
  }, [])

  useEffect(() => {
    if (!game) {
      setErrorMessage('Sorry! There is some issue loading the game.');
    }
    fetchSimilarGame();
  }, [game])

  useEffect(() => {
    if(!hasMounted) return;

    if(searchTerm){ 
      navigate('/');
    }
	}, [debouncedSearchTerm, hasMounted]);


  return (
    <main>
      <ScrollToTop />

      <div className={width <= 480 ? 'flex flex-col gap-3' : ''}>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} userData={userData} />

        {width > 480 ? ''
          : <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
      </div>

      <section className='game-preview'>
        <div className='header'>

          <h2>{name ? name : 'NA'}</h2>

          <div className=' flex gap-2'>

            <div className=' icon ' title='Ratings'>  {/* Rating */}
              <p className='text-white text-[14px]'>{rating > 0 ? `${rating}/5 (${ratings_count})` : 'N/A'}</p>
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

        <section>
          <GameDetails game={game} />
        </section>

        <section className='flex flex-col gap-[32px]'>
          <h2>Similar Games</h2>

          {isLoading ? <Spinner />
            : gamesErrorMessage ? (<p className='text-red-500'>{gamesErrorMessage}</p>)
              : <div className='all-games'>
                {similarGamesList.map((game) => (
                  <Game key={`${game.id}-${game.slug}`} game={game} />
                ))}
              </div>
          }
        </section>

        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

      </section>

    </main>
  )
}

export default GamePreview