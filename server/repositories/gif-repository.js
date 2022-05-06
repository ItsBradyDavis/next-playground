import fetch from 'cross-fetch';

const giphyBaseUrl = 'https://api.giphy.com/v1/gifs';

const limit = 50;

export const getGifsForSearchQuery = async (searchTerm) => {
    const url = `${giphyBaseUrl}/search?api_key=${process.env.GIPHY_API_KEY}&q=${searchTerm}&limit=${limit}=offset=0&lang=en`;

    try {
        const response = await fetch(url);

        const result = await response.json();

        return result.data;
    } catch (error) {
        console.log('Error fetching from giphy:', error);

        return undefined;
    }
};

