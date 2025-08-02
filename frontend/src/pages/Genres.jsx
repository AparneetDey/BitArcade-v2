import React, { useEffect, useState } from 'react'
import ScrollToTop from '../components/ScrollToTop';
import Navbar from '../components/Navbar';
import { useScreenSize } from '../components/useScreenSize';
import Search from '../components/Search';
import Spinner from '../components/Spinner';
import Game from '../components/Game';

const API_URL = import.meta.env.VITE_API_URL;

const Genres = ({ searchTerm, setSearchTerm, userData }) => {
    const [gamesList, setGamesList] = useState([]);
    const [gamesErrorMessage, setGamesErrorMessage] = useState('');
    const [genresList, setGenresList] = useState([]);
    const [genresErrorMessage, setGenresErrorMessage] = useState('');
    const [genre, setGenre] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const { width, height } = useScreenSize();

    const fetchGenres = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/genres`);

            if (!response.ok) {
                throw new Error('Error loading genres');
            }

            const data = await response.json();

            if (Object.keys(data).length === 0) {
                setGenresList([]);
                setGenresErrorMessage('No genres found');
                return;
            }

            console.log(data.results);

            setGenresList(data.results);

        } catch (error) {
            console.log(`Error loading genres: ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchGenres();
    }, [])

    const fetchGenresGames = async (query) => {
        setIsLoading(true);
        setGamesErrorMessage('');

        try {
            const endpoint = query ?
                `${API_URL}/games?query=${query}`
                : `${API_URL}/games`;

            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error('Error fetching game!');
            }

            const data = await response.json();


            if (Object.keys(data).length === 0) {
                setGamesErrorMessage(data.error || 'Games can not be loaded');
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
        fetchGenresGames()
    }, [genre])


    return (
        <main>
            <ScrollToTop />
            <div className={width <= 480 ? 'flex flex-col gap-3' : ''}>
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} userData={userData} />

                {width > 480 ? ''
                    : <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
            </div>

            <section className='px-4 md:px-10 flex flex-col gap-[32px]'>
                <h2>Genres</h2>

                {isLoading ? <Spinner />
                    : genresErrorMessage ? (<p className='text-red-500'>{genresErrorMessage}</p>)
                        :
                        <div className='all-genres'>
                            {genresList.map((genre) => (
                                <div key={genre.id} onClick={() => setGenre(genre.name)} className='genre' title={genre.name}>
                                    <div className='background'>
                                        <img src={genre.image_background} alt={genre.name} />
                                    </div>
                                    <h3 className='name'>{genre.name}</h3>
                                </div>
                            ))}
                        </div>
                }
            </section>

            <section className='px-4 md:px-10 flex flex-col gap-[32px]'>
                <h2>Filtered Games</h2>

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