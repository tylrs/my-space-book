import './App.css';
import { React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Images from '../Images/Images';
import { fetchImages, cleanImages } from '../../utils';
import { sampleData } from '../../sample-data';

const App = () => {
  const [images, setImages] = useState([]);
  const [likedImages, setLikedImages] = useState([]);
  const [likedImageIds, setLikedImageIds] = useState({});
  const [error, setError] = useState('');

  const getImages = async () => {
    setError('')
    try {
      // const imageData = await fetchImages()
      const cleanedImages = cleanImages(sampleData)
      setImages(cleanedImages)
    } catch(err) {
      setError(err)
    }
  }

  const likeOrUnlikeImage = (id) => {
    if (!likedImageIds[id]) {
      setLikedImageIds({id, ...likedImageIds})
      const foundImage = images.find(image => image.id === id)
      setLikedImages([foundImage, ...likedImages])
    } else {
      delete likedImageIds[id]
      const filteredImages = likedImages.filter(image => image.id !== id)
      setLikedImages([...filteredImages])
    }
  }

  useEffect(() => {
    getImages()
  }, []) 

  return (
    <main>
      {/* {console.log(images)} */}
      <header className='header'>
        <button onClick={() => {getImages()}}>Get New Images</button>
        <h1>My Space Book</h1>
        <NavLink to='/my-liked'>My Liked Images</NavLink>
      </header>
      <Images imagesInfo={images}/>
    </main>
  );
}

export default App;
