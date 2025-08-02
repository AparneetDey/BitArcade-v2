import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';

const API_URL = import.meta.env.VITE_API_URL;

const API_OPTION = {
    method: "GET",
    headers: {
        accept: "application/json",
    }
}

const GenreList = ({ setGenre }) => {
    const [genresList, setGenresList] = useState([]);
    const [genresErrorMessage, setGenresErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchGenres = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/genres`, API_OPTION);

            if (!response.ok) {
                setGenresErrorMessage('Error getting genres!');
                throw new Error('Error loading genres');
            }

            const data = await response.json();

            if (Object.keys(data).length === 0) {
                setGenresList([]);
                setGenresErrorMessage('No genres found');
                return;
            }

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

    return (
        <section className='px-4 md:px-10 flex flex-col gap-[32px]'>
            <h2>Genres</h2>

            {isLoading ? <Spinner />
                : genresErrorMessage ? (<p className='text-red-500'>{genresErrorMessage}</p>)
                    :
                    <div className='all-genres'>
                        {genresList.map((genre) => (
                            <div key={genre.id} onClick={() => setGenre(genre)} className='genre' title={genre.name}>
                                <div className='background'>
                                    <img src={genre.image_background} alt={genre.name} />
                                </div>
                                <h3 className='name'>{genre.name}</h3>
                            </div>
                        ))}
                    </div>
            }
        </section>
    )
}

export default GenreList