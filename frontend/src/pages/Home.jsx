import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Game from '../components/Game'
import Spinner from '../components/Spinner'
import { useDebounce } from 'react-use'
import { NavLink } from 'react-router'
import { useScreenSize } from '../components/useScreenSize'
import Search from '../components/Search'

const GAMES_API_BASE_URL = 'https://www.cheapshark.com/api/1.0'

const GAMES_API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
  }
}

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [gamesList, setGamesList] = useState([]);
  const [gamesErrorMessage, setGamesErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState({})

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
        `${GAMES_API_BASE_URL}/deals?title=${encodeURIComponent(query)}&pageSize=100`
        : `${GAMES_API_BASE_URL}/deals?pageSize=100`;

      const response = await fetch(endpoint, GAMES_API_OPTION);

      if (!response.ok) {
        throw new Error('Error fetching game!');
      }

      const data = await response.json();


      if (!data && data.length === 0) {
        setGamesErrorMessage(data.error || 'Games can not be loaded');
        setGamesList([]);
        return;
      }

      const uniqueGames = [];
      const seen = new Set();

      data.forEach((game) => {
        if (!seen.has(game.title)) {
          seen.add(game.title);
          uniqueGames.push(game);
        }
      });

      if (uniqueGames.length === 0) {
        setGamesErrorMessage('No Games Found');
        setGamesList(uniqueGames);
        return
      }

      setGamesList(uniqueGames.slice(0, 21));

    } catch (error) {
      console.log(`Error fetcing games: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames(debouncedSearchTerm)
  }, [debouncedSearchTerm])



  const fetchUser = async () => {
    try {
      const response = await fetch(`${API_URL}/user`);

      if(!response.ok){
        throw new Error('Response is not okay');
      }

      const data = await response.json();

      console.log(data);

      if(data.data.length === 0){
        setUserData([]);
        return;
      }

      setUserData(data.data);

    } catch (error) {
      console.log(`Error fetching user from backend: ${error}`)
    }
  }
  
  useEffect( () => {
    fetchUser()
  }, [])



  const {width, height} = useScreenSize();

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
          <NavLink to={'/authentication/signup'}><Button content={"Join For Free"} /></NavLink>
          <img src="./hero-poster.png" alt="Hero Poster" />
        </section> :
        ''
      }

      <section className='px-4 md:px-10 flex flex-col gap-[32px]'>
        <h2>Popular Games</h2>

        {isLoading ? <Spinner />
          : gamesErrorMessage ? (<p className='text-red-500'>{gamesErrorMessage}</p>)
            : <div className='all-games'>
              {gamesList.map((game) => (
                <Game key={game.gameID} game={game} />
              ))}
            </div>
        }
      </section>
    </main>
  )
}

export default Home