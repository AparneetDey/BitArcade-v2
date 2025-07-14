import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Game from '../components/Game'
import Spinner from '../components/Spinner'

const API_BASE_URL = 'https://www.cheapshark.com/api/1.0'

const API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
  }
}


const Home = () => {
  const [gamesList, setGamesList] = useState([]);
  const [gamesErrorMessage, setGamesErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchGames = async () => {
    setIsLoading(true);
    setGamesErrorMessage('');

    try {
      const endpoint = `${API_BASE_URL}/deals?pageSize=20`;

      const response = await fetch(endpoint, API_OPTION);

      if (!response.ok) {
        throw new Error('Error fetching game!');
      }

      const data = await response.json();

      console.log(data);

      if (!data && data.length === 0) {
        setGamesErrorMessage(data.error || 'Games can not be loaded');
        setGamesList([]);
        return;
      }

      console.log(data.results);
      setGamesList(data);

    } catch (error) {
      console.log(`Error fetcing games: ${error}`);
    } finally {
      setGamesErrorMessage('');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames()
  }, [])


  return (
    <main>
      <Navbar />

      <section className='hero'>
        <p className='main-liner'>From retro gems to modern epics – explore the world of games in one place.</p>
        <p className='sub-liner'>Detailed insights, game art, trailers, and more – all at your fingertips.</p>
        <Button content={"Join For Free"} display={'inline'} />
        <img src="./hero-poster.png" alt="Hero Poster" />
      </section>

      <section className='px-4 md:px-10 flex flex-col gap-[32px]'>
        <h2>Popular Games</h2>

        {isLoading ? <Spinner />
          : gamesErrorMessage ? (<p className='text-red-500'>{gamesErrorMessage}</p>)
          : <div className='all-games'>
              <Game game={gamesList[0]} />
            </div>
        }
      </section>
    </main>
  )
}

export default Home