import React from 'react';
import './Image.css';

const Image = ({url, title, date}) => {
    return (
        <article className='space-image'>
            <img src={url}/>
            <caption>{title}</caption>
            <caption>{date}</caption>
        </article>
    )
}

export default Image;