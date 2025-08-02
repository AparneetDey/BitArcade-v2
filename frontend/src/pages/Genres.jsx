import React, { useEffect, useState } from 'react'
import ScrollToTop from '../components/ScrollToTop';
import Navbar from '../components/Navbar';
import { useScreenSize } from '../components/useScreenSize';
import Search from '../components/Search';
import Spinner from '../components/Spinner';
import Game from '../components/Game';
import GenreList from '../components/GenreList';
import { useNavigate } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL;

const API_OPTION = {
    method: "GET",
    headers: {
        accept: "application/json",
    }
}

const Genres = ({ searchTerm, setSearchTerm, userData, genre, setGenre, debouncedSearchTerm }) => {
    const [gamesList, setGamesList] = useState([]);
    const [gamesErrorMessage, setGamesErrorMessage] = useState('');
    const [hasMounted, setHasMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const { width, height } = useScreenSize();
    const navigate = useNavigate();

    const fetchGenresGames = async (query) => {
        setIsLoading(true);
        setGamesErrorMessage('');

        try {
            const endpoint = query ?
                `${API_URL}/genregames?query=${query}`
                : `${API_URL}/genregames`;

            const response = await fetch(endpoint, API_OPTION);

            if (!response.ok) {
                throw new Error('Error fetching game!');
            }

            const data = await response.json();


            if (Object.keys(data).length === 0) {
                setGamesErrorMessage(data.error || 'No Game found for this Genre!');
                setGamesList([]);
                return;
            }

            setGamesList(data.results);

        } catch (error) {
            console.log(`Error fetcing games: ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchGenresGames(genre.slug)
    }, [genre.slug])

    useEffect(() => {
      setHasMounted(true)
    }, [])
    

    useEffect(() => {
        if (!hasMounted) return;

        console.log(searchTerm)

        if (searchTerm) {
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

            <GenreList setGenre={setGenre} />

            <section className='px-4 md:px-10 flex flex-col gap-[32px]'>
                <h2>Filtered Games {genre ? `(${genre.name})` : ''}</h2>

                {isLoading ? <Spinner />
                    : gamesErrorMessage ? (<p className='text-red-500'>{gamesErrorMessage}</p>)
                        : <div className='all-games'>
                            {gamesList.map((game) => (
                                <Game key={`${game.id}-${game.slug}`} game={game} />
                            ))}
                        </div>
                }
            </section>
        </main>
    )
}

export default Genres