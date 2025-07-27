import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Game from '../components/Game'
import Spinner from '../components/Spinner'
import { useDebounce } from 'react-use'
import { NavLink } from 'react-router'
import { useScreenSize } from '../components/useScreenSize'
import Search from '../components/Search'

const API_URL = import.meta.env.VITE_API_URL;

const API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
  }
}

const Home = ({ searchTerm, setSearchTerm, userData }) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [gamesList, setGamesList] = useState(['game']);
  const [gamesErrorMessage, setGamesErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useDebounce(() =>
    setDebouncedSearchTerm(searchTerm),
    700,
    [searchTerm]
  )

  const fetchGames = async (query) => {
    setIsLoading(true);
    setGamesErrorMessage('');

    try {
      const endpoint = query ?
        `${API_URL}/games?query=${query}`
        : `${API_URL}/games`;

      const response = await fetch(endpoint, API_OPTION);

      if (!response.ok) {
        throw new Error('Error fetching game!');
      }

      const data = await response.json();


      if (Object.keys(data).length === 0) {
        setGamesErrorMessage(data.error || 'Games can not be loaded');
        setGamesList([]);
        return;
      }

      // const uniqueGames = [];
      // const seen = new Set();

      // data.forEach((game) => {
      //   if (!seen.has(game.title)) {
      //     seen.add(game.title);
      //     uniqueGames.push(game);
      //   }
      // });

      // if (uniqueGames.length === 0) {
      //   setGamesErrorMessage('No Games Found');
      //   setGamesList(uniqueGames);
      //   return
      // }

      // console.log(uniqueGames);

      console.log(data.results);

      setGamesList(data.results);

    } catch (error) {
      console.log(`Error fetcing games: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const { width, height } = useScreenSize();

  return (
    <main>
      <div className={width <= 480 ? 'flex flex-col gap-3' : ''}>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} userData={userData} />

        {width > 480 ? ''
          : <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
      </div>
      {debouncedSearchTerm === '' ?
        <section className='hero'>
          <p className='main-liner'>From retro gems to modern epics – explore the world of games in one place.</p>
          <p className='sub-liner'>Detailed insights, game art, trailers, and more – all at your fingertips.</p>
          {userData.username ? '' : <NavLink to={'/authentication/login'}><Button content={"Join For Free"} /></NavLink>}
          <div className='poster'>
            <img src="./hero-poster.png" alt="Hero Poster" />
          </div>
        </section> :
        ''
      }

      <section className='px-4 md:px-10 flex flex-col gap-[32px]'>
        <h2>Popular Games</h2>

        {isLoading ? <Spinner />
          : gamesErrorMessage ? (<p className='text-red-500'>{gamesErrorMessage}</p>)
            : <div className='all-games'>
              {gamesList.map((game, index) => (
                <Game key={`${game.id}-${game.slug}`} game={game} />
              ))}
            </div>
        }
      </section>
    </main>
  )
}

export default Home