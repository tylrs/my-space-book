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
    return imageData.map((image, index) => {
        image.id = index + 1
        return image;
    })
}