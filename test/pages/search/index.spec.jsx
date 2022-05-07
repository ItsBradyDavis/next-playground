import {useRouter} from 'next/router';
import * as RTL from '@testing-library/react';
import '@testing-library/jest-dom'

import fetch from 'cross-fetch';
import Chance from 'chance';

import {useSearch, SearchProvider} from '../../../client/hooks/search-provider';
import SearchHome from '../../../pages/search';

jest.mock('cross-fetch');
jest.mock('../../../client/hooks/search-provider');
jest.mock('next/router');

const chance = new Chance();
describe('SearchHome', () => {
    let expectedRouter, expectedUseSearch, expectedAPIData, expectedAPIResponse;

    beforeEach(() => {
        expectedRouter = {
            query: {
                searchTerm: chance.string()
            }
        };

        expectedUseSearch = {
            loading: false,
            search: chance.string(),
            fetchGifResults: jest.fn(),
            setSearch: jest.fn()
        };

        expectedAPIData = {
            [chance.word()]: chance.string()
        };

        SearchProvider.mockImplementation((props) => <div>{props.children}</div>);

        expectedAPIResponse = {
            json: jest.fn().mockResolvedValue(expectedAPIData)
        };

        fetch.mockResolvedValue(expectedAPIResponse);
        useRouter.mockImplementation(() => expectedRouter);
        useSearch.mockImplementation(() => expectedUseSearch);
    });

    const renderComponent = () => RTL.render(<SearchHome />);

    test('should not set search term if no search term is on query', () => {
        delete expectedRouter.query.searchTerm;

        renderComponent();

        expect(expectedUseSearch.setSearch).not.toHaveBeenCalled();
    });

    test('should not set search term if search is the same as query', () => {
        expectedUseSearch.search = expectedRouter.query.searchTerm;

        renderComponent();

        expect(expectedUseSearch.setSearch).not.toHaveBeenCalled();
    });

    test('should set search but not attempt to fetch if is loading', () => {
        expectedUseSearch.loading = true;

        renderComponent();

        expect(expectedUseSearch.setSearch).toHaveBeenCalledTimes(1);
        expect(expectedUseSearch.setSearch).toHaveBeenCalledWith(expectedRouter.query.searchTerm);

        expect(expectedUseSearch.fetchGifResults).not.toBeCalled();
    });

    test('should fetch from API', async () => {
        renderComponent();

        expect(expectedUseSearch.setSearch).toHaveBeenCalledTimes(1);
        expect(expectedUseSearch.setSearch).toHaveBeenCalledWith(expectedRouter.query.searchTerm);

        expect(expectedUseSearch.fetchGifResults).toHaveBeenCalledTimes(1);
        expect(expectedUseSearch.fetchGifResults).toHaveBeenCalledWith(expectedRouter.query.searchTerm);
    });

    test('should render search bar', () => {
        const {getByTestId} = renderComponent();

        expect(getByTestId('search-input')).toBeInTheDocument();
    });
});