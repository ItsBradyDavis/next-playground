import styles from './searchbar.module.css';
import {useSearch} from '../../hooks/search-provider';

const SearchBar = () => {
    const {search, setSearch} = useSearch();

    return (
        <form className={styles.searchBar}>
            <label htmlFor={'header-search'}>
                <span className={styles.visuallyHidden}>Search gifs on Giphy</span>
            </label>
            <input
                data-testId={'search-input'}
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