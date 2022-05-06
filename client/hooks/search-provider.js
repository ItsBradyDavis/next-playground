import {useState, createContext, useContext} from 'react';

const SearchContext = createContext({});

const useProvideSearch = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    return {
        data,
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