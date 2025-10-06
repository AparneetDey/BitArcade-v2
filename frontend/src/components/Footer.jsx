import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

const Footer = () => {
  return (
    <div className='text-white flex flex-col gap-4 justify-between px-4 md:px-10 md:flex-row'>
        <div className='font-bold'>
            Made By Aparneet Dey
        </div>
        <ul className='flex gap-4'>
            <li><a href="https://github.com/AparneetDey" target='_blank'><FontAwesomeIcon icon="fa-brands fa-github" size="xl" /></a></li>
            <li><a href="https://www.linkedin.com/in/aparneet-dey-9098a5323/" target='_blank'><FontAwesomeIcon icon="fa-brands fa-linkedin" size="xl" /></a></li>
            <li><a href="https://x.com/Mr_X800" target='_blank'><FontAwesomeIcon icon="fa-brands fa-x-twitter" size="xl" /></a></li>
        </ul>
    </div>
  )
}

export default Footer