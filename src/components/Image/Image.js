import React from 'react';
import './Image.css';

const Image = ({imageInfo}) => {
    const {url, title, date} = imageInfo;

    return (
        <article className='space-image-box'>
            <img src={url}/>
            <p>{title}</p>
            <p>{date}</p>
            <button>Like</button>
        </article>
    )
}

export default Image;