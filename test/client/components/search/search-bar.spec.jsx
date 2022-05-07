import Chance from 'chance';
import * as RTL from '@testing-library/react';
import '@testing-library/jest-dom'

import {useSearch} from '../../../../client/hooks/search-provider';
import SearchBar from '../../../../client/components/search/search-bar';

jest.mock('../../../../client/hooks/search-provider');

const chance = new Chance();

describe('SearchBar', () => {
    let expectedUseSearch;

    beforeEach(() => {
        expectedUseSearch = {
            search: chance.string(),
            setSearch: jest.fn()
        };

        useSearch.mockReturnValue(expectedUseSearch);
    });

    afterEach(() => {
        RTL.cleanup();
    });

    const renderComponent = () => RTL.render(<SearchBar />);

    test('should render input with search value', () => {
        const {getByDisplayValue} = renderComponent();

        expect(getByDisplayValue(expectedUseSearch.search)).toBeInTheDocument();
    });

    test('should set search value on input', () => {
        const {getByTestId} = renderComponent();

        const input = getByTestId('search-input');

        const newValue = chance.string();

        RTL.fireEvent.change(input, {target: {value: newValue}});

        expect(expectedUseSearch.setSearch).toHaveBeenCalledTimes(1);
        expect(expectedUseSearch.setSearch).toHaveBeenCalledWith(newValue);
    });
});