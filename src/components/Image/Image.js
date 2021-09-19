import React from 'react';
import './Image.css';

const Image = ({imageInfo, likeOrUnlikeImage}) => {
    const {url, title, date, id} = imageInfo;

    const handleClick = () => {
        const result = likeOrUnlikeImage(id)
        console.log(result)
    }

    return (
        <article className='space-image-box'>
            <img src={url} alt={title}/>
            <p>{title}</p>
            <p>{date}</p>
            <button onClick={() => {handleClick()}}>Like</button>
        </article>
    )
}

export default Image;