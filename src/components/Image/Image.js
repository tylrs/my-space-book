import React, {useState} from 'react';
import './Image.css';

const Image = ({imageInfo, likeOrUnlikeImage}) => {
    const [likeMode, setLikeMode] = useState(true)

    const {url, title, date, id} = imageInfo;

    const handleClick = () => {
        const result = likeOrUnlikeImage(id)
        setLikeMode(result)
    }

    return (
        <article className='space-image-box'>
            <img src={url} alt={title}/>
            <p>{title}</p>
            <p>{date}</p>
            <button onClick={() => {handleClick()}}>{likeMode ? 'Like' : 'Unlike'}</button>
        </article>
    )
}

export default Image;