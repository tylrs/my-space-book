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
  const [error, setError] = useState('');

  const getImages = async () => {
    setError('')
    setImages([])
    const liked = JSON.parse(localStorage.getItem('likedImages'))
    if (liked) setLikedImages(liked)
    try {
      const imageData = await fetchImages()
      const cleanedImages = cleanImages(imageData)
      setImages(cleanedImages)
    } catch(err) {
      setError(err.message)
    }
  }

  const likeImage = (id) => {
    const foundImage = images.find(image => image.id === id)
    foundImage.liked = true;
    const newLiked = [foundImage, ...likedImages]
    setLikedImages(newLiked)
    localStorage.setItem('likedImages', JSON.stringify(newLiked))
  }

  const unlikeImage = (id) => {
    const filteredImages = likedImages.filter(image => image.id !== id)
    const newImages = images.map(image => {
      if (image.id === id) image.liked = false
      return image
    })
    setLikedImages([...filteredImages])
    localStorage.setItem('likedImages', JSON.stringify([...filteredImages]))
    setImages(newImages)
  }

  useEffect(() => {
    getImages()
  }, []) 

  return (
    <Switch>
      <Route exact path='/' render={() => 
        <main>
          <header className='header'>
            <button className='get-images' onClick={() => {getImages()}}>Get New Images</button>
            <h1>My Space Book</h1>
            <NavLink className='liked-images-nav' to='/my-liked'>My Liked Images</NavLink>
          </header>
          {!!error && <p className='error-message'>{error}</p>}
          {!images.length && !error
            ? <div className='loading-message-container'><FontAwesomeIcon className="loading-message" icon={faGlobeAmericas}/></div>
            : <Images imagesInfo={images} likeImage={likeImage} unlikeImage={unlikeImage}/>
          }
        </main>
      }/>
      <Route exact path='/my-liked' render={() => 
        <main>
          <header className='header'>
            <Link className='back-button' to='/'>Back</Link>
            <h1>My Liked Images</h1>
            <div></div>
          </header>
          {likedImages.length && !error 
            ? <Images imagesInfo={likedImages} likeImage={likeImage} unlikeImage={unlikeImage}/>
            : <p className='error-message'>No Saved Images. Go back and add some!</p>
          }
        </main>
      }/>
      <Route path = '/*' render={() => 
          <main>
            <header className='header'>
              <Link className='error-title' to='/'><h1>My Space Book</h1></Link>
            </header>
            <p className='error-message'>404 page not found. Click title above.</p>
          </main>
      }/>
    </Switch>
  );
}

export default App;
