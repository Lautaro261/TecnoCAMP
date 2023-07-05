import { Button, Space, Table, Tooltip, Tag} from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getFavorites, deleteFavorite } from '../../../Redux/Features/products/clientProductsSlice';
import { useDispatch, useSelector } from 'react-redux';


const Favorites = () => {
 // const [filteredInfo, setFilteredInfo] = useState({});
 const dispatch = useDispatch();
 const favorites = useSelector(state=>state.clientProducts.favorites);
 const token = window.localStorage.getItem("token");
  const [sortedInfo, setSortedInfo] = useState({});
  const [heartColor, setHeartColor] = useState("#eb2f96");
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter);
  };
  const handleDelete = (key) => {
    const inf = {
      id_favorite: key
    }
    console.log('Borro', inf)
    dispatch(deleteFavorite({token, inf}))
    //dispatch(banProduct([token, key]))
    //location.reload();
    
};


  const data = favorites && favorites.map(f =>{
    return (
        {
            key: f.id_favorite,
            name: f.product.name,
            price: f.product.price,
            is_available: f.product.is_available,
            photo: f.product.photo[0],
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
      //title: "Foto",
      dataIndex: "photo",
      align: 'center',
      render: (photo) => (
        <>
          {" "}
          <img
            style={{ maxHeight: "10vh", width: "5vw", borderRadius: "10%" }}
            src={photo}
          />{" "}
        </>
      ),
    },
    {
      title: 'Producto',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
      align: 'center'
    },
    {
      title: 'Precio (COP)',
      dataIndex: 'price',
      key: 'price',
     /*  sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null, */
      ellipsis: true,
      align: 'center'
    },
    {
      title: 'Disponible',
      dataIndex: 'is_available',
      key: 'is_available',
      render: (isAvailable) => (
        <Tag color={isAvailable ? 'green' : 'volcano'}>
          {isAvailable ? 'En Stock' : 'Agotado'}
        </Tag>
      ),
      ellipsis: true,
      align: 'center',
    },
    {
      title: "Agregar/Quitar",
      dataIndex: "acciones",
      key: "acciones",
      align: 'center',
      render: (_, record) => (
        <>
        <HeartTwoTone 
        onClick={()=> handleDelete(record.key, record.is_available)} 
        twoToneColor={heartColor} 
        style={{ fontSize: '24px' }}
        onMouseEnter={() => setHeartColor("#a13373")} // Cambia el color al pasar el cursor
        onMouseLeave={() => setHeartColor("#eb2f96")}
        />
          {/* <Button onClick={()=> handleDelete(record.key, record.is_available)}>eliminar</Button> */}
        </>
      )
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