import handler from '../../../pages/api/health';

describe('health', () => {
    let req,
        res,
        status,
        json;

    beforeEach(() => {
        json = jest.fn();
        status = jest.fn().mockReturnValue({json});
        res = {
            status,
        };
        req = {};
    });

    test('should return status 200 & ok status object', () => {
        handler(req, res);

        expect(status).toHaveBeenCalledTimes(1);
        expect(status).toHaveBeenCalledWith(200);

        expect(json).toHaveBeenCalledTimes(1);
        expect(json).toHaveBeenCalledWith({
            status: 'ok',
        });
    });
});
