import Chance from 'chance';
import fetch from 'cross-fetch';

import {getGifsForSearchQuery} from '../../../server/repositories/gif-repository';

jest.mock('cross-fetch');

const chance = new Chance();

describe('gif repository', () => {
    let search, expectedResponse;

    describe('getGifsForSearchQuery', () => {
        let processEnv;

        beforeAll(() => {
            processEnv = process.env;
        });

        afterAll(() => {
            process.env = processEnv;
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        beforeEach(() => {
            process.env.GIPHY_API_KEY = chance.string();
            search = chance.word();

            expectedResponse = {
                data: {
                    [chance.word()]: chance.string()
                }
            };

            fetch.mockResolvedValue({
                json: jest.fn().mockResolvedValue(expectedResponse)
            });
        });

        test('should fetch from giphy ', async () => {
            const result = await getGifsForSearchQuery(search);

            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${search}&limit=50=offset=0&lang=en`)

            expect(result).toStrictEqual(expectedResponse.data);
        });

        describe('if there is an error fetching', () => {
            beforeEach(() => {
                fetch.mockRejectedValue(chance.string());
            });

            test('should return undefined', async () => {
                const result = await getGifsForSearchQuery(search);

                expect(result).toBeUndefined();
            });
        });
    });
});