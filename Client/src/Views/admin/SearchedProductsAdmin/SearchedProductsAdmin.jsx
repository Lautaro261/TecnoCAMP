import React from 'react'
import { useSelector } from 'react-redux'
import { Pagination, Row, Col, Empty, Space, Table, Button } from 'antd';



function SearchedProductsAdmin() {
  
//     const searchedResult = useSelector(state => state.clientProducts.searchedResult)
//     console.log('searchedresult', searchedResult)

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

//     const data =  searchedResult.map(c => {
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
//     console.log();


//     return (
//     <div>
//          <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }}/>
       
//                                 {/* <Col span={24} key={product.id}>
//                                    <ProductCard
//                                         e_product_type={product.e_product_type}
//                                         name={product.name}
//                                         price={product.price}
//                                         id={product.id}
//                                         photo={product.photo}
//                                     />
//                                 </Col> */}

//     </div>
//   )
 }

export default SearchedProductsAdmin