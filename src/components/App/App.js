import './App.css';
import { React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Images from '../Images/Images';
import { sampleData } from '../../sample-data';

const App = () => {
  const [images, setImages] = useState([])
  const [error, setError] = useState('')

  const getImages = async () => {
    setError('')
    try {
      const imageData = await fetchImages()
      setImages(imageData)
    } catch(err) {
      setError(err)
    }
  }

  useEffect(() => {

  }) 

  return (
    <main>
      <header className='header'>
        <button>Randomizer</button>
        <h1>My Space Book</h1>
        <NavLink to='/my-liked'>My Liked Images</NavLink>
      </header>
      <Images imagesInfo={sampleData}/>
    </main>
  );
}

export default App;
