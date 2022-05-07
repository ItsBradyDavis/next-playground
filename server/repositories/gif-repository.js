import fetch from 'cross-fetch';

const giphyBaseUrl = 'https://api.giphy.com/v1/gifs';
const proc = require('process');

const limit = 50;

export const getGifsForSearchQuery = async (searchTerm) => {
    const url = `${giphyBaseUrl}/search?api_key=${proc.env.GIPHY_API_KEY}&q=${searchTerm}&limit=${limit}=offset=0&lang=en`;

    try {
        const response = await fetch(url);

        const result = await response.json();

        return result.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error);

        return undefined;
    }
};

