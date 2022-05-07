import Chance from 'chance';
import * as RHTL from '@testing-library/react-hooks';

import {SearchProvider, useSearch} from '../../../client/hooks/search-provider';

const chance = new Chance();

describe('SearchProvider', () => {
    let wrapper,
        result;

    beforeEach(() => {
        wrapper = ({children}) => <SearchProvider>{children}</SearchProvider>;

        result = RHTL.renderHook(() => useSearch(), {wrapper}).result;
    });

    afterEach(() => {
        jest.clearAllMocks();
        RHTL.cleanup();
    });

    test('should set default search, data, loading', () => {
        expect(result.current.search).toBe('');
        expect(result.current.data).toBeNull();
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
});
