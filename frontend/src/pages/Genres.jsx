import React, { useEffect, useState } from 'react'
import Genre from '../components/genre';
import ScrollToTop from '../components/ScrollToTop';
import Navbar from '../components/Navbar';
import { useScreenSize } from '../components/useScreenSize';
import Search from '../components/Search';
import Spinner from '../components/Spinner';

const API_URL = import.meta.env.VITE_API_URL;

const Genres = (searchTerm, setSearchTerm, userData) => {
    const [genresList, setGenresList] = useState([]);
    const [genresErrorMessage, setGenresErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {width, height} = useScreenSize();

    const fetchGenres = async () => {
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
        }
    }

    useEffect(() => {
        fetchGenres();
    }, [])

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
                        : <div className='all-genres'>
                            {genresList.map((genre) => (
                                <Genre key={`${genre.id}-${genre.slug}`} genre={genre} />
                            ))}
                        </div>
                }
            </section>
        </main>
    )
}

export default Genres