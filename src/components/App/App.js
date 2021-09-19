import './App.css';
import React, { useState, useEffect } from 'react';
import { NavLink, Link, Switch, Route } from 'react-router-dom';
import Images from '../Images/Images';
import { fetchImages, cleanImages } from '../../utils';
import { sampleData } from '../../sample-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [images, setImages] = useState([]);
  const [likedImages, setLikedImages] = useState([]);
  const [likedImageIds, setLikedImageIds] = useState({});
  const [error, setError] = useState('');

  const getImages = async () => {
    setError('')
    try {
      const imageData = await fetchImages()
      const cleanedImages = cleanImages(imageData)
      setImages(cleanedImages)
    } catch(err) {
      setError(err)
    }
  }

  const likeOrUnlikeImage = (id) => {
    if (!likedImageIds[id]) {
      const newIds = {...likedImageIds}
      newIds[id] = id
      setLikedImageIds({...newIds})
      const foundImage = images.find(image => image.id === id)
      setLikedImages([foundImage, ...likedImages])
      return false
    } else {
      delete likedImageIds[id]
      const filteredImages = likedImages.filter(image => image.id !== id)
      setLikedImages([...filteredImages])
      return true
    }
  }

  useEffect(() => {
    getImages()
  }, []) 

  return (
    <Switch>
      <Route exact path='/' render={() => 
        <main>
          <header className='header'>
            <button onClick={() => {getImages()}}>Get New Images</button>
            <h1>My Space Book</h1>
            <NavLink to='/my-liked'>My Liked Images</NavLink>
          </header>
          {!images.length 
            ? <div className='loading-message-container'><FontAwesomeIcon className="loading-message" icon={faGlobeAmericas}/></div>
            : <Images imagesInfo={images} likeOrUnlikeImage={likeOrUnlikeImage}/>
          }
        </main>
      }/>
      <Route exact path='/my-liked' render={() => 
        <main>
          <header className='header'>
            <Link to='/'>Back</Link>
            <h1>My Space Book</h1>
            <h2>My Liked Images</h2>
          </header>
          <Images imagesInfo={likedImages} likeOrUnlikeImage={likeOrUnlikeImage}/>
        </main>
      }/>
    </Switch>
  );
}

export default App;
