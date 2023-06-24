import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button, Row, Col, Empty, Space } from 'antd';



function SearchedProductsAdmin() {

    const searchedResult = useSelector((state) => state.adminProducts.searchedResult);
    //console.log("soy searchedResult", searchedResult);

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

     const data = searchedResult && searchedResult.map(c => {
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

    //console.log("soy data", data); 

    return (
        <div>
             <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }}/> 
        
    </div>
)
 }

export default SearchedProductsAdmin