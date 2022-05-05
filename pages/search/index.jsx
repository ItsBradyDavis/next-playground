import {useEffect, useState} from 'react';
import Head from 'next/head';

import Layout, {siteTitle} from '../../components/Layout';
import SearchBar from '../../components/search/SearchBar';
import {useRouter} from 'next/router';

const SearchHome = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

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
        <Layout>
            <Head>
                siteTitle
            </Head>
            <SearchBar
                search={search}
                setSearch={setSearch}
            />
        </Layout>
    )
};


export default SearchHome