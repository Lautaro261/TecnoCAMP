//import styles from './SearchBar.module.css';
import { Input } from 'antd';
import { getProductsSearched } from '../../../../Redux/Features/productsClient/productsClientSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';



const SearchBar = () => {
    const { Search } = Input;
    const dispatch = useDispatch();
    
    const onSearch = (value) => {
    console.log(value);
    dispatch(getProductsSearched(value));
    };

    return (
	    <div /* className={ styles.searchBar__container } */>
            <Search
                onSearch={ onSearch } 
                placeholder="Buscar..." 
                enterButton
            />
		</div>
    );
};

export default SearchBar;