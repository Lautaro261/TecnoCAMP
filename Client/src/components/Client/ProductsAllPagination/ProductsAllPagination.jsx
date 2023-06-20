import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setCurrentAllProducts, 
  setCurrentPage 
} from '../../../Redux/Features/products/clientProductsSlice';
// Se paso el currentPage de estado local a estado global con Redux

const itemRender = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
};

const ProductsPagination = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.clientProducts.allProducts);
    const currentPage = useSelector(state => state.clientProducts.currentPage);

    const totalItems = allProducts.length;
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    useEffect(() => {
      dispatch(setCurrentPage(1));
    }, []);
    
    useEffect(() => {
      if (allProducts.length > 0) {
        const currentAllProducts = allProducts.slice(startIndex, endIndex);
        dispatch(setCurrentAllProducts(currentAllProducts));
      } else {
        dispatch(setCurrentPage(1));
        dispatch(setCurrentAllProducts([]));
      }
    }, [allProducts, currentPage, dispatch, startIndex, endIndex]);

    const handlePageChange = (pageNumber) => {
      dispatch(setCurrentPage(pageNumber));
    };

    return (
        <Pagination
            total={ totalItems }
            current={ currentPage }
            defaultPageSize={ itemsPerPage }
            onChange={ handlePageChange }
            itemRender={ itemRender }
        />
    );
};

export default ProductsPagination;