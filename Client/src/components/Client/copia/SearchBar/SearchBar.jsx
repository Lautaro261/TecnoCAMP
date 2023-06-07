import styles from './SearchBar.module.css';
import { Input } from 'antd';


const onSearch = (value) => {
    console.log(value);
};

const SearchBar = () => {
    const { Search } = Input;

    return (
	    <div className={ styles.searchBar__container }>
            <Search
                onSearch={ onSearch } 
                placeholder="Buscar..." 
                enterButton
            />
		</div>
    );
};

export default SearchBar;