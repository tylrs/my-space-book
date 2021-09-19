import React from 'react';
import './Image.css';

const Image = ({imageInfo, likeOrUnlikeImage}) => {
    const {url, title, date} = imageInfo;

    return (
        <article className='space-image-box'>
            <img src={url} alt={title}/>
            <p>{title}</p>
            <p>{date}</p>
            <button>Like</button>
        </article>
    )
}

export default Image;