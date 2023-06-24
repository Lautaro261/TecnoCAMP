
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button, Row, Col, Empty, Space } from 'antd';




function SearchedProductsAdmin() {
  const searchedResult = useSelector((state) => state.admin.searchedResult);
  console.log("soy searchedResult", searchedResult);


    const searchedResult = useSelector((state) => state.adminProducts.searchedResult);
    //console.log("soy searchedResult", searchedResult);

  const data = typeof searchedResult === 'string' ?
    <Empty /> :
    searchedResult.length &&
  searchedResult.map((c) => {
    return {
      key: c.id,
      photo: c.photo,
      name: c.name,
      total_quantity_inventory: c.total_quantity_inventory,
      category: c.category.name,
      brand: c.brand.name,
    };
  });

 // console.log("soy data", data);

  return (
    <div>
      {typeof searchedResult === "string" ? (
        <Empty />
      ) : (
        searchedResult.length && (
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
          />
        )

    })

    //console.log("soy data", data); 

    return (
        <div>
             <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }}/> 
        

    </div>
  );
}

export default SearchedProductsAdmin;
