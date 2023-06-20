import { Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    sortAlphabetically,
    sortByPrice,
    setSelectedValueToFilter
 } from '../../../Redux/Features/products/clientProductsSlice';

const ProductsSorting = () => {
  const dispatch = useDispatch();
  const selectedValueToFilter = useSelector(state => state.clientProducts.selectedValueToFilter);

  const handleSelectChange = (value) => {
    dispatch(setSelectedValueToFilter(value));
  };

  useEffect(() => {
      dispatch(setSelectedValueToFilter(''));
  }, []);

  useEffect(() => {
      if (selectedValueToFilter === 'ascendent' || selectedValueToFilter === 'descendent') {
          dispatch(sortAlphabetically(selectedValueToFilter));
          dispatch(setSelectedValueToFilter(selectedValueToFilter));
      }
      if (selectedValueToFilter === 'moreExpensive' || selectedValueToFilter === 'cheapest') {
          dispatch(sortByPrice(selectedValueToFilter));
          dispatch(setSelectedValueToFilter(selectedValueToFilter));
      }
  }, [selectedValueToFilter]);

  return (
    <Select
        placeholder="Seleccionar ordenamiento"
        onChange={ handleSelectChange }
        value={ selectedValueToFilter }
        style={{
        width: 200,
        }}
    >
      <Select.Option value="moreExpensive">Mayor Precio</Select.Option>
      <Select.Option value="cheapest">Menor Precio</Select.Option>
      <Select.Option value="ascendent">A - Z</Select.Option>
      <Select.Option value="descendent">Z - A</Select.Option>
    </Select>
  );
};
export default ProductsSorting;
