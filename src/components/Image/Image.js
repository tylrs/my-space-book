import React from 'react';
import './Image.css';

const Image = ({imageInfo}) => {
    const {url, title, date} = imageInfo;

    return (
        <article className='space-image'>
            <img src={url}/>
            <caption>{title}</caption>
            <caption>{date}</caption>
            <button>Like</button>
        </article>
    )
}

export default Image;