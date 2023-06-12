import React, {useEffect} from 'react'
import { getAllProducts } from '../../../Redux/Features/productsClient/productsClientSlice';
import { useSelector, useDispatch } from 'react-redux';
import CardProduct from '../CardProduct/CardProduct';

const ContainerProducts = ()=>{

    const dispatch = useDispatch()
    const allProducts = useSelector( (state) => state.productsClient.allProducts)
    const token = window.localStorage.getItem('token')

    useEffect(()=>{
        dispatch(getAllProducts({token}))
    },[dispatch])
    return (
        <div>
            { allProducts.length && allProducts.map( product =>{
                return(
                    <div key={product.id}>
                    <CardProduct  name={product.name} photo={product.photo} />
                    </div>
                )
            })}
        </div>
    )
}

export default ContainerProducts;
