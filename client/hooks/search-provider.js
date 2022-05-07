import {useState, createContext, useContext} from 'react';
import fetch from "cross-fetch";

const SearchContext = createContext({});

const useProvideSearch = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchGifResults = async (searchTerm) => {
        setLoading(true);
        const response = await fetch(`api/search/${searchTerm}`);

        const data = await response.json();
        console.log('data', data);

        setData(data);
        setLoading(false);
    };

    return {
        data,
        fetchGifResults,
        loading,
        search,
        setData,
        setLoading,
        setSearch
    }
};

export const SearchProvider = (props) => {
    const search = useProvideSearch();

    return(
        <SearchContext.Provider value={search}>
            {props.children}
        </SearchContext.Provider>
    )
};

export const useSearch = () => {
    return useContext(SearchContext);
};