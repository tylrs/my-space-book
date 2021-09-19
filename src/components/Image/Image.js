import React, {useState} from 'react';
import './Image.css';

const Image = ({imageInfo, likeOrUnlikeImage}) => {
    const [likeMode, setLikeMode] = useState(true)
    const [likeMessage, setLikeMessage] = useState(false)
    const [timer, setTimer] = useState('')

    const {url, title, date, id} = imageInfo;

    const handleClick = () => {
        const result = likeOrUnlikeImage(id)
        setLikeMode(result)
        setLikeMessage(true)
        setTimer(setTimeout(() => {
            setLikeMessage(false)
        }, 3000))

    }

    return (
        <article className='space-image-box'>
            <img src={url} alt={title}/>
            {likeMessage && <p className='like-message'>{likeMode ? 'Unliked' : 'Liked'}</p>}
            <p>{title}</p>
            <p>{date}</p>
            <button onClick={() => {handleClick()}}>{likeMode ? 'Like' : 'Unlike'}</button>
        </article>
    )
}

export default Image;