//  import React, { useEffect } from 'react'
//  import { useSelector, useDispatch } from 'react-redux';


//  import { getAllProducts } from '../../../Redux/Features/admin/adminSlice';

// import { SearchOutlined } from '@ant-design/icons';
// import { Button, Input, Space, Table } from 'antd';
// import { useRef, useState } from 'react';
// import Highlighter from 'react-highlight-words';

// function TableInventory() {
//     const dispatch = useDispatch()
//     const token = window.localStorage.getItem("token");
//     const allProducts = useSelector((state) => state.admin.allProducts)

//     useEffect(()=>{
//         dispatch(getAllProducts(token))
//     },[dispatch])

//     const columns=[
//         {
//             title: 'Foto',
//             dataIndex: 'photo',
//             render: (photo) => <> <img style={{maxHeight: '10vh', width:"5vw", borderRadius: "10%" }} src={photo} /> </>
//             // width: '30%',
//             // editable: true,
//         },
//         {
//             title: "Nombre",
//             dataIndex:"name"
//         },
//         {
//             title: "Stock",
//             dataIndex:"total_quantity_inventory"
//         },
//         {
//             title: "Marca",
//             dataIndex:"brand"
//         },
//         {
//             title: "Categoria",
//             dataIndex:"category"
//         },
//         {
//             title: "Acciones",
//             dataIndex:"acciones",
//             render: fila=> <> <Button type='primary' >Editar</Button > {"  "} <Button type='primary' danger>Eliminar</Button>  </>
//         },
//     ];

    
//     //const allProducts=useSelector(state=>state.allProducts)
//     const data = allProducts && allProducts.map(c => {
//         return (
//             {
//                 key: c.id,
//                 photo: c.photo,
//                 name: c.name,
//                 total_quantity_inventory: c.total_quantity_inventory,
//                 category: c.category.name,
//                 brand: c.brand.name,
//             }
//         )
//     })
//     console.log(allProducts);

//   return (
//     <div>
//         <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }}/>

//     </div>
//   )
// }

//import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { getAllProducts } from '../../../Redux/Features/admin/adminSlice';


function TableInventory() {

        const dispatch = useDispatch()
     const token = window.localStorage.getItem("token");
    const allProducts = useSelector((state) => state.admin.allProducts)

     useEffect(()=>{
         dispatch(getAllProducts(token))
     },[dispatch])

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  

  const columns = [
    {
        title: "Photo",
        dataIndex: "photo",
        render: (photo) => <> <img style={{maxHeight: '10vh', width:"5vw", borderRadius: "10%" }} src={photo} /> </>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'key',
      width: '30%',
      ...getColumnSearchProps('name'),
      sorter: (c, d) => c.name.length - d.name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Stock",
      dataIndex:"total_quantity_inventory",
      key: 'key',
      ...getColumnSearchProps('total_quantity_inventory'),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'key',
      width: '20%',
      ...getColumnSearchProps('category'),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'key',
      ...getColumnSearchProps('brand'),
      sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
                     title: "Acciones",
                    dataIndex:"acciones",
                     render: fila=> <> <Button type='primary' >Editar</Button > {"  "} <Button type='primary' danger>Eliminar</Button>  </>
                 },
  ];
  console.log("soy colums", columns);

  const data = 
    allProducts && allProducts.map(c => {
                return (
                    {
                        key: c.id,
                        photo: c.photo,
                        name: c.name,
                        total_quantity_inventory: c.total_quantity_inventory,
                        category: c.category.name,
                        brand: c.brand.name,
                        color: c.color
                    }
                )
            })

console.log(data);


  return <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />;
};





export default TableInventory