import Chance from 'chance';

import {getGifsForSearchQuery} from '../../../../server/repositories/gif-repository';
import handler from '../../../../pages/api/search/[search]';

jest.mock('../../../../server/repositories/gif-repository');

const chance = new Chance();

describe('search handler', () => {
    let req,
        res,
        status,
        json,
        expectedResult;

    beforeEach(() => {
        req = {
            query: {
                search: chance.string(),
            },
        };

        json = jest.fn();
        status = jest.fn().mockReturnValue({json});

        res = {
            status,
        };

        expectedResult = {
            [chance.word()]: chance.string(),
        };

        getGifsForSearchQuery.mockResolvedValue(expectedResult);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return 200 & gif results', async () => {
        await handler(req, res);

        expect(getGifsForSearchQuery).toHaveBeenCalledTimes(1);
        expect(getGifsForSearchQuery).toHaveBeenCalledWith(req.query.search);

        expect(status).toHaveBeenCalledTimes(1);
        expect(status).toHaveBeenCalledWith(200);
        expect(json).toHaveBeenCalledTimes(1);
        expect(json).toHaveBeenCalledWith(expectedResult);
    });

    describe('given no results are found', () => {
        beforeEach(() => {
            getGifsForSearchQuery.mockResolvedValue(undefined);
        });

        test('should return 500 response', async () => {
            await handler(req, res);

            expect(status).toHaveBeenCalledTimes(1);
            expect(status).toHaveBeenCalledWith(500);
        });
    });
});
