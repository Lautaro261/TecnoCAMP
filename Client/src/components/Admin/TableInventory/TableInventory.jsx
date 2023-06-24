import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { Table, Button } from 'antd'
import { getAllProducts } from '../../../Redux/Features/admin/products/adminProductsSlice';
// import { getAllProducts } from '../../../Redux/Features/admin/adminSlice';

function TableInventory() {
    const dispatch = useDispatch()
    const token = window.localStorage.getItem("token");
    const allProducts = useSelector((state) => state.adminProducts.allProducts)

    useEffect(()=>{
        dispatch(getAllProducts(token))
    },[dispatch])

    const columns=[
        {
            title: 'Foto',
            dataIndex: 'photo',
            render: (photo) => <> <img style={{maxHeight: '10vh', width:"5vw", borderRadius: "10%" }} src={photo} /> </>
            // width: '30%',
            // editable: true,
        },
        {
            title: "Nombre",
            dataIndex:"name"
        },
        {
            title: "Stock",
            dataIndex:"total_quantity_inventory"
        },
        {
            title: "Marca",
            dataIndex:"brand"
        },
        {
            title: "Categoria",
            dataIndex:"category"
        },
        {
            title: "Acciones",
            dataIndex:"acciones",
            render: fila=> <> <Button type='primary' >Editar</Button > {"  "} <Button type='primary' danger>Eliminar</Button>  </>
        },
    ];

    
    //const allProducts=useSelector(state=>state.allProducts)
    const data = allProducts && allProducts.map(c => {
        return (
            {
                key: c.id,
                photo: c.photo,
                name: c.name,
                total_quantity_inventory: c.total_quantity_inventory,
                category: c.category.name,
                brand: c.brand.name,
            }
        )
    })
    console.log(allProducts);

  return (
    <div>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }}/>

    </div>
  )
}

export default TableInventory