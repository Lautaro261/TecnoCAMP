import React, { useEffect } from 'react'
import { getAllProducts } from '../../../Redux/Features/productsClient/productsClientSlice';
import { useSelector, useDispatch } from 'react-redux';
import CardProduct from '../CardProduct/CardProduct';
import { Pagination } from 'antd';


const ContainerProducts = () => {

    const dispatch = useDispatch()
    const allProducts = useSelector((state) => state.productsClient.allProducts)
    const token = window.localStorage.getItem('token')
    console.log('estoy en conteinerProduct', allProducts)

    useEffect(() => {
        dispatch(getAllProducts({ token }))
    }, [dispatch])
    return (
        <div>
            <Pagination defaultCurrent={1} total={50} />
            {allProducts.length && allProducts.map(product => {
                return (
                    <div key={product.id}>
                        <CardProduct e_product_type={product.e_product_type} name={product.name} price={product.price} />
                    </div>
                )
            })}
            <Pagination defaultCurrent={1} total={50} />
        </div>
    )
}

export default ContainerProducts;
