/* import React from "react";
import BannerEarPhones from "./BannerEarPhones/BannerEarPhones";
import BannerSmartPhones from "./BannerSmartPhones/BannerSmartPhones";
import BannerSmartWatches from "./BannerSmartWatches/BannerSmartWatches";
import BannerAllProducts from "./BannerAllProducts/BannerAllProducts";
import { useEffect } from "react";
import { getProductsByCategory } from "../../../Redux/Features/productsClient/productsClientSlice";
// import { useDispatch } from "react-redux";

const Banner = () => {
    // const dispatch = useDispatch();
     let categoryName = window.localStorage.getItem('category_name');
    const idProduct = window.localStorage.getItem('category_id');

    
    useEffect(() => {
        console.log('SOY CATEGORIA BANNER', categoryName); 
        // dispatch(getProductsByCategory(idProduct))
        // return function clean(){
        //     dispatch(clearProductsByCategory())
        // }
         
    }, [categoryName])

    if(categoryName==='Smartphone'){
        return (console.log('ENTRE EN IF SMARTPHONE:',categoryName))
    }

    if(categoryName==='Smartwatch'){
        return (console.log('ENTRE EN IF SMARTWATCH:',categoryName))
    }

    if(categoryName=== 'Earphone'){
        return (console.log('ENTRE EN IF SMAREARPHONE:',categoryName))
    }

    if(!categoryName){
        return (console.log('ENTRE EN IF NULL:',categoryName))
    }



                             
         if( categoryName === 'Smartphone'){
            console.log('ENTRE EN IF SMARTPHONE',categoryName); 
            return(
                <BannerSmartPhones/>
            );
        }
        else if( categoryName === 'Smartwatch'){
            console.log('ENTRE EN IF SMARTWATCH',categoryName); 
            return(
                <BannerSmartWatches/>
            );
        }
        else if( categoryName === 'Earphone'){
            
            return(
                <BannerEarPhones/>
            );
        }
        else{
            return(
                <BannerAllProducts />
            );
        } 


}

export default Banner; */

import React, { useEffect, useState } from "react";
import BannerEarPhones from "./BannerEarPhones/BannerEarPhones";
import BannerSmartPhones from "./BannerSmartPhones/BannerSmartPhones";
import BannerSmartWatches from "./BannerSmartWatches/BannerSmartWatches";
import BannerAllProducts from "./BannerAllProducts/BannerAllProducts";

const Banner = () => {
    const [categoryName, setCategoryName] = useState('');
    let storedCategoryName = window.localStorage.getItem('category_name');

    // console.log('categoria en banner', storedCategoryName)

    useEffect(() => {
        setCategoryName(storedCategoryName);
    }, [  storedCategoryName ]);

    if (categoryName === 'Smartphone') {
        return <BannerSmartPhones />;
    } else if (categoryName === 'Smartwatch') {
        return <BannerSmartWatches />;
    } else if (categoryName === 'Earphone') {
        return <BannerEarPhones />;
    } else {
        return <BannerAllProducts />;
    }
}

export default Banner;