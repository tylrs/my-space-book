import './App.css';
import { React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Images from '../Images/Images';
import { fetchImages } from '../../utils';
// import { sampleData } from '../../sample-data';

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
    getImages()
  }, []) 

  return (
    <main>
      <header className='header'>
        <button>Randomizer</button>
        <h1>My Space Book</h1>
        <NavLink to='/my-liked'>My Liked Images</NavLink>
      </header>
      <Images imagesInfo={images}/>
    </main>
  );
}

export default App;
