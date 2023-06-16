import React from "react";
import BannerEarPhones from "./BannerEarPhones/BannerEarPhones";
import BannerSmartPhones from "./BannerSmartPhones/BannerSmartPhones";
import BannerSmartWatches from "./BannerSmartWatches/BannerSmartWatches";
import BannerAllProducts from "./BannerAllProducts/BannerAllProducts";
import { useEffect } from "react";
import { getProductsByCategory } from "../../../Redux/Features/productsClient/productsClientSlice";
import { useDispatch } from "react-redux";

const Banner = () => {
     let categoryName = window.localStorage.getItem('category_name');
    const dispatch = useDispatch();
    const idProduct = window.localStorage.getItem('category_id')
    useEffect(() => {
        dispatch(getProductsByCategory(idProduct))
        // return function clean(){
        //     dispatch(clearProductsByCategory())
        // }
    }, [idProduct, dispatch, categoryName])



 
        if( categoryName === 'Smartphone'){
            console.log('ENTRE EN IF SMARTPHONE',categoryName); 
            return(
                <BannerSmartPhones/>
            )
        }
        else if( categoryName === 'Smartwatch'){
            console.log('ENTRE EN IF SMARTWATCH',categoryName); 
            return(
                <BannerSmartWatches/>
            )
        }
        else if( categoryName === 'Earphone'){
            
            return(
                <BannerEarPhones/>
            )
        }
        else{
            return(
                <BannerAllProducts />
            )
        }


}

export default Banner;