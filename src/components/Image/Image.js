import React, {useState, useEffect} from 'react';
import './Image.css';

const Image = ({imageInfo, likeImage, unlikeImage}) => {
    const [likeMode, setLikeMode] = useState(true)
    const [likeMessage, setLikeMessage] = useState(false)
    const [timer, setTimer] = useState('')

    const {url, title, date, id, liked} = imageInfo;

    const handleClick = () => {
        if (!liked) {
            likeImage(id)
            setLikeMode(false)
        } else {
            unlikeImage(id)
            setLikeMode(true)
        }
        setLikeMessage(true)
        setTimer(setTimeout(() => {
            setLikeMessage(false)
        }, 2000))

    }

    useEffect(() => {
        setTimer('')
    }, [])

    return (
        <article className='space-image-box'>
            <img src={url} alt={title}/>
            <p className='image-title'>{title}</p>
            <p>Date of Capture: {date}</p>
            {likeMessage && <p className='like-message'>{likeMode ? 'Unliked' : 'Liked'}</p>}
            {!likeMessage && <button className='like-button' onClick={() => {handleClick()}}>
                {liked ? 'Unlike' : 'Like'}
            </button>}
        </article>
    )
}

export default Image;