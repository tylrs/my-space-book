import React from 'react';
import './Images.css';
import Image from '../Image/Image';

const Images = ({imagesInfo, likeImage, unlikeImage}) => {
    const images = imagesInfo.map(imageInfo => 
        <Image 
            imageInfo={imageInfo} 
            key={imageInfo.date}
            likeImage={likeImage}
            unlikeImage={unlikeImage}
        />)
        
    return (
        <section className='images'>
            {images}
        </section>
    )
}

export default Images;