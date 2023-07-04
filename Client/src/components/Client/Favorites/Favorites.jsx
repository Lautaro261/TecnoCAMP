import { Button, Space, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { getFavorites } from '../../../Redux/Features/products/clientProductsSlice';
import { useDispatch, useSelector } from 'react-redux';

const dat = [
  {
    key: '1',
    name: 'John Brown',
    price: 32,
    is_available: true,
  },
  {
    key: '2',
    name: 'Jim Green',
    price: 42,
    is_available: false,
  },
  {
    key: '3',
    name: 'Joe Black',
    price: 32,
    is_available: true,
  },
  {
    key: '4',
    name: 'Jim Red',
    price: 32,
    is_available: true,
  },
];

const Favorites = () => {
 // const [filteredInfo, setFilteredInfo] = useState({});
 const dispatch = useDispatch();
 const favorites = useSelector(state=>state.clientProducts.favorites);
 const token = window.localStorage.getItem("token");
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter);
  };


  const data = favorites && favorites.map(f =>{
    return (
        {
            key: f.id_favorite,
            name: f.product.name,
            price: f.product.price,
            is_available: f.product.is_available,
        }
    )
  })
/*   const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  }; */
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
     /*  sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null, */
      ellipsis: true,
    },
    {
      title: 'Disponible',
      dataIndex: 'is_available',
      key: 'is_available',
      render:(_, record)=>
        (data.length > 0) && record.is_available ? 
        <Button type="primary">soy true</Button>: 
        <Button type="primary">soy false</Button>,
      ellipsis: true,
    },
  ];


  useEffect(()=>{
    dispatch(getFavorites(token));
    console.log(favorites)
  },[])
  return (
    <>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};
export default Favorites;