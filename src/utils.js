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
    const cleanedImages = [];
     imageData.forEach(image => {
         if (image.media_type === 'image') {
            image.id = image.date
            image.liked = false;
            image = formatDate(image) 
            cleanedImages.push(image)
         }
    })
    return cleanedImages
}

const formatDate = (image) => {
    let date = image.date
    image.date = new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })
    return image
}