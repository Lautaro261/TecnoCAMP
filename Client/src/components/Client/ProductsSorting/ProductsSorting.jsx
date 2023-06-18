import { Select } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    sortAlphabetically,
    sortByPrice,
    setSelectedValueToFilter
 } from '../../../Redux/Features/products/clientProductsSlice';

const ProductsSorting = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const dispatch = useDispatch();

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
      dispatch(setSelectedValueToFilter(''));
  }, []);

  useEffect(() => {
      if (selectedValue === 'ascendent' || selectedValue === 'descendent') {
          dispatch(sortAlphabetically(selectedValue));
          dispatch(setSelectedValueToFilter(selectedValue));
      }
      if (selectedValue === 'moreExpensive' || selectedValue === 'cheapest') {
          dispatch(sortByPrice(selectedValue));
          dispatch(setSelectedValueToFilter(selectedValue));
      }
  }, [selectedValue]);

  return (
    <Select
        placeholder="Seleccionar ordenamiento"
        onChange={ handleSelectChange }
        value={ selectedValue }
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
