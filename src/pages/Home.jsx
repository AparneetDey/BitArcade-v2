import React, { useState } from 'react'
import Search from '../components/Search'
import Button from '../components/Button'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <main>
      <Navbar />

      <section className='hero'>
        <p className='main-liner'>From retro gems to modern epics – explore the world of games in one place.</p>
        <p className='sub-liner'>Detailed insights, game art, trailers, and more – all at your fingertips.</p>
        <Button content={"Join For Free"} display={'inline'} />
        <img src="./hero-poster.png" alt="Hero Poster" />
      </section>
    </main>
  )
}

export default Home