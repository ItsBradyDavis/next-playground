import {useEffect, useState} from 'react';
import Head from 'next/head';
import fetch from 'cross-fetch';

import Layout, {siteTitle} from '../../client/components/Layout';
import SearchBar from '../../client/components/search/search-bar';
import {useRouter} from 'next/router';
import {useSearch, SearchProvider} from '../../client/hooks/search-provider';

const SearchContainer = () => {
    const {loading, setSearch, setLoading, setData} = useSearch();
    const router = useRouter();

    useEffect(async () => {
        if (router.query.searchTerm) {
            setSearch(router.query.searchTerm);

            if(!loading) {
                setLoading(true);
                const response = await fetch(`api/search/${router.query.searchTerm}`);
                console.log('response', response);

                const data = await response.json();
                console.log('data', data);

                setData(data);
                setLoading(false);
            }

        }
    }, [router, setSearch]);

    return (
        <>
            <SearchBar />
        </>
    )
};

const SearchHome = () => (
    <Layout>
        <Head>
            siteTitle
        </Head>
        <SearchProvider>
            <SearchContainer/>
        </SearchProvider>
    </Layout>
);


export default SearchHome;