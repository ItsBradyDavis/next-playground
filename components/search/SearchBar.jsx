import {useState, useEffect} from 'react';
import styles from './searchbar.module.css';

import {useRouter} from 'next/router';

const SearchBar = ({search, setSearch}) => {

    return (
        <form className={styles.searchBar}>
            <label htmlFor={'header-search'}>
                <span className={styles.visuallyHidden}>Search gifs on Giphy</span>
            </label>
            <input
                value={search}
                onInput={(event) => setSearch(event.target.value)}
                className={styles.searchInput}
                type={"text"}
                id={"header-search"}
                placeholder={"Search gifs on Giphy"}
                name={'searchTerm'}
            />
            <button type={"submit"}>Search</button>
        </form>
    );
}

export default SearchBar;