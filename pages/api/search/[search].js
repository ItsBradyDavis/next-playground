import {getGifsForSearchQuery} from '../../../server/repositories/gif-repository';

const handler = async (req, res) => {
    const {
        query: {search}
    } = req;

    const gifResults = await getGifsForSearchQuery(search);

    if (gifResults) {
        res.status(200).json(gifResults);
    } else {
        res.status(500);
    }
};

export default handler;