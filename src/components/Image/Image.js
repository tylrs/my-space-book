import React, {useState} from 'react';
import { useEffect } from 'react/cjs/react.development';
import './Image.css';

const Image = ({imageInfo, likeOrUnlikeImage}) => {
    const [likeMode, setLikeMode] = useState(true)
    const [likeMessage, setLikeMessage] = useState(false)
    const [timer, setTimer] = useState('')

    const {url, title, date, id, liked} = imageInfo;

    const handleClick = () => {
        const result = likeOrUnlikeImage(id)
        setLikeMode(result)
        setLikeMessage(true)
        setTimer(setTimeout(() => {
            setLikeMessage(false)
        }, 3000))

    }

    useEffect(() => {
        setTimer('')
    }, [])

    return (
        <article className='space-image-box'>
            <img src={url} alt={title}/>
            <p>{title}</p>
            <p>{date}</p>
            {likeMessage && <p className='like-message'>{likeMode ? 'Unliked' : 'Liked'}</p>}
            <button className='like-button' onClick={() => {handleClick()}}>
                {liked ? 'Unlike' : 'Like'}
            </button>
        </article>
    )
}

export default Image;