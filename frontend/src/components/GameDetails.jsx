import React from 'react'
import DOMPurify from 'dompurify';
import { Link } from 'react-router';
import Button from './Button';

const GameDetails = ({ game }) => {
    return (
        <div className='desc'>
            {/* description */}
            <div className='label'>Description</div>
            <p className='text-white' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(game.description) }}></p>

            {/* developers */}
            <div className='label'>Developers</div>
            {game.developers.length !== 0 ?
                (
                    <div className='flex flex-wrap gap-2'>
                        {game.developers.map((dev, index) => (
                            <div key={dev.id} className='text-[#fff] flex gap-1'>
                                {dev.name}
                                {index < game.developers.length - 1 && <span className='text-white'>|</span>}
                            </div>
                        ))}
                    </div>
                ) :
                (
                    <div className='text-[#bababa]'>N/A</div>
                )
            }

            {/* Tags */}
            <div className='label'>Tags</div>
            {game.tags.length !== 0 ?
                (
                    <div className='flex flex-wrap gap-2'>
                        {game.tags.map(tag => (
                            <div key={tag.id} className='tag'>{tag.name}</div>
                        ))}
                    </div>
                ) :
                (
                    <div className='text-[#bababa]'>N/A</div>
                )
            }

            {/* genres */}
            <div className='label'>Genres</div>
            {game.genres.length !== 0 ?
                (
                    <div className='flex flex-wrap gap-2'>
                        {game.genres.map(gen => (
                            <div key={gen.id} className='tag'>{gen.name}</div>
                        ))}
                    </div>
                ) :
                (
                    <div className='text-[#bababa]'>N/A</div>
                )
            }

            {/* metacritic */}
            <div className='label'>Metacritic</div>
            <div className='text-[#fff]'>{game.metacritic ? game.metacritic : 'N/A'}</div>

            {/* released */}
            <div className='label'>Released</div>
            <div className='text-[#fff]'>{game.released ? game.released : 'N/A'}</div>

            {/* platforms */}
            <div className='label'>Platforms</div>
            {game.platforms.length !== 0 ?
                (
                    <div className='flex flex-wrap gap-1'>
                        {game.platforms.map((platform, index) => (
                            <div key={platform.platform.id} className='text-[#fff] flex gap-1'>
                                {platform.platform.name}
                                {index < game.platforms.length - 1 && <span className='text-[#fff]'>|</span>}
                            </div>
                        ))}
                    </div>
                ) :
                (
                    <div className='text-[#bababa]'>N/A</div>
                )
            }

            {/* stores */}
            <div className='label'>Stores</div>
            {game.stores.length !== 0 ?
                (
                    <div className='flex flex-wrap gap-2'>
                        {game.stores.map(store => (
                            <a href={`https://${store.store.domain}`} target='_blank' key={store.id} className='tag'>{store.store.name}</a>
                        ))}
                    </div>
                ) :
                (
                    <div className='text-[#bababa]'>N/A</div>
                )
            }

            <Link to={'/'} className='mt-8'>
                <Button content={'Home'} />
            </Link>

        </div>
    )
}

export default GameDetails