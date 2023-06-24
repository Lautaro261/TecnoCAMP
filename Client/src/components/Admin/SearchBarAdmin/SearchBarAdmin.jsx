import React from 'react'
import { Input } from 'antd';
import { getProductsSearched } from "../../../Redux/Features/admin/adminSlice";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function SearchBarAdmin() {
    const token = window.localStorage.getItem("token");
    const { Search } = Input;
     const dispatch = useDispatch();
      const navigate= useNavigate();
     
     const onSearch = (value) => {
      console.log('COMPONENTE',value);
      console.log('COMPONENTE',token);
     dispatch(getProductsSearched({value, token}));
     navigate('/searchedProductsAdmin')
      };


  return (
    <div >
      
     <Search
       onSearch={ onSearch } 
        placeholder="Buscar productos por nombre..." 
        enterButton
    />
</div>
  )
}

export default SearchBarAdmin