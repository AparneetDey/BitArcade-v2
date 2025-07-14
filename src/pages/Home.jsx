import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Game from '../components/Game'
import Spinner from '../components/Spinner'
import { useDebounce } from 'react-use'

const API_BASE_URL = 'https://www.cheapshark.com/api/1.0'

const API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
  }
}


const Home = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [gamesList, setGamesList] = useState([]);
  const [gamesErrorMessage, setGamesErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setsearchTerm] = useState('');

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
        `${API_BASE_URL}/deals?title=${encodeURIComponent(query)}&pageSize=100`
        : `${API_BASE_URL}/deals?pageSize=100`;

      const response = await fetch(endpoint, API_OPTION);

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

      console.log(uniqueGames);

      if(uniqueGames.length === 0){
        setGamesErrorMessage('No Games Found');
        setGamesList(uniqueGames);
        return
      }

      setGamesList(uniqueGames.slice(3, 24));

    } catch (error) {
      console.log(`Error fetcing games: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames(debouncedSearchTerm)
  }, [debouncedSearchTerm])


  return (
    <main>
      <Navbar searchTerm={searchTerm} setsearchTerm={setsearchTerm} />

      {debouncedSearchTerm === '' ?
        <section className='hero'>
          <p className='main-liner'>From retro gems to modern epics – explore the world of games in one place.</p>
          <p className='sub-liner'>Detailed insights, game art, trailers, and more – all at your fingertips.</p>
          <Button content={"Join For Free"} display={'inline'} />
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