//import styles from './SearchBar.module.css';
import { Input } from 'antd';
import { getProductsSearched } from '../../../../Redux/Features/products/clientProductsSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
    const { Search } = Input;
    const dispatch = useDispatch();
    const navigate= useNavigate();
    
    const onSearch = (value) => {
    console.log(value);
    dispatch(getProductsSearched(value));
    navigate('/searchedProducts')
    };

    return (
	    <div /* className={ styles.searchBar__container } */>
            <Search
                onSearch={ onSearch } 
                placeholder="Buscar productos por nombre..." 
                enterButton
            />
		</div>
    );
};

export default SearchBar;