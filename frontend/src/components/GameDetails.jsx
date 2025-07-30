import React from 'react'
import DOMPurify from 'dompurify';

const GameDetails = ({ game }) => {
    return (
        <div className='grid grid-cols-[100px_1fr] gap-x-2 gap-y-[18px] md:grid-cols-[150px_1fr] max-w-[900px] w-full'>
            {/* Tags */}
            <div className='label'>Tags</div>
            <div className='flex flex-wrap gap-2'>
                {game.tags.map(tag => (
                    <div key={tag.id} className='tag'>{tag.name}</div>
                ))}
            </div>
			
            {/* description */}
			<div className='label'>Description</div>
			<p className='text-white text-[14px]' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(game.description) }}></p>
        </div>
    )
}

export default GameDetails