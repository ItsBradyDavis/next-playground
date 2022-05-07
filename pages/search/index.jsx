import {useEffect, } from 'react';
import Head from 'next/head';

import Layout, {siteTitle} from '../../client/components/Layout';
import SearchBar from '../../client/components/search/search-bar';
import {useRouter} from 'next/router';
import {useSearch, SearchProvider} from '../../client/hooks/search-provider';

const SearchContainer = () => {
    const {loading, search, setSearch, fetchGifResults} = useSearch();
    const router = useRouter();

    useEffect(async () => {
        if (router.query.searchTerm && router.query.searchTerm !== search) {
            setSearch(router.query.searchTerm);

            if(!loading) {
                await fetchGifResults(router.query.searchTerm)
            }

        }
    }, [router, search, fetchGifResults]);

    return (
        <>
            <SearchBar />
        </>
    )
};

const SearchHome = () => (
    <Layout>
        <Head>
            {siteTitle}
        </Head>
        <SearchProvider>
            <SearchContainer/>
        </SearchProvider>
    </Layout>
);


export default SearchHome;