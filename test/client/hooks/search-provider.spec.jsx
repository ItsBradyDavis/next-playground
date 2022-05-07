import Chance from 'chance';
import * as RHTL from '@testing-library/react-hooks';
import fetch from 'node-fetch';

import {SearchProvider, useSearch} from '../../../client/hooks/search-provider';

jest.mock('node-fetch');

const chance = new Chance();

describe('SearchProvider', () => {
    let wrapper,
        expectedResponse,
        expectedData,
        result;

    beforeEach(() => {
        expectedData = {
            [chance.word()]: chance.string()
        };

        expectedResponse = {
            json: jest.fn().mockResolvedValue(expectedData)
        };

        fetch.mockResolvedValue(expectedResponse);

        wrapper = ({children}) => <SearchProvider>{children}</SearchProvider>;

        result = RHTL.renderHook(() => useSearch(), {wrapper}).result;
    });

    afterEach(() => {
        jest.clearAllMocks();
        RHTL.cleanup();
    });

    test('should set default search, data, loading', () => {
        expect(result.current.search).toBe('');
        expect(result.current.data).toBeUndefined();
        expect(result.current.loading).toBe(false);
    });

    test('should set search', () => {
        const expectedSearch = chance.string();

        RHTL.act(() => {
            result.current.setSearch(expectedSearch);
        });

        expect(result.current.search).toBe(expectedSearch);
    });

    test('should set data', () => {
        const expectedData = {
            [chance.word()]: chance.string(),
        };

        RHTL.act(() => {
            result.current.setData(expectedData);
        });

        expect(result.current.data).toBe(expectedData);
    });

    test('should set loading', () => {
        const expectedLoading = !result.current.loading;

        RHTL.act(() => {
            result.current.setLoading(expectedLoading);
        });

        expect(result.current.loading).toBe(expectedLoading);
    });
    
    test('should fetch gif results & set loading / data', async () => {
        const search = chance.string();

        await RHTL.act(async () => {
            await result.current.fetchGifResults(search);
        });

        expect(result.current.data).toStrictEqual(expectedData);
        expect(result.current.loading).toStrictEqual(false);

    });
});
