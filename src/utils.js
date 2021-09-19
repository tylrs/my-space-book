export const fetchImages = async () => {
    try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=iFKelpSH9TLhm1UyPVmKoRwpzbZm9mZWe9WeDBRy&count=9')
        if (!response.ok) {
            throw Error("Hmm looks like those images are lost in space...try refreshing the page!");
        } else {
            const parsed = await response.json();
            return parsed;
        }
    } catch (err) {
        throw Error(err)
    }
}

export const cleanImages = (imageData) => {
    return imageData.map(image => {
        image.id = image.date
        image.liked = false;
        return formatDate(image) 
    })
}

const formatDate = (image) => {
    let date = image.date
    image.date = new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })
    return image
}