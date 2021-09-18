import React from 'react';
import './Images.css';

const Images = ({imagesInfo}) => {

    const images = imagesInfo.map(imageInfo => 
            <Image imageInfo={imageInfo}/>
        )

    return (
        <section className='images'>
            {images}
        </section>
    )
}

export default Images;