import React from "react";
import BannerEarPhones from "./BannerEarPhones/BannerEarPhones";
import BannerSmartPhones from "./BannerSmartPhones/BannerSmartPhones";
import BannerSmartWatches from "./BannerSmartWatches/BannerSmartWatches";
import BannerAllProducts from "./BannerAllProducts/BannerAllProducts";
import { useEffect } from "react";

const Banner = ({categoria}) => {
/*     useEffect(()=>{

    },[categoria]) */
 
        if( categoria === '/categories/smartphones'){
            return(
                <BannerSmartPhones/>
            )
        }
        if( categoria === '/categories/smartwatches'){
            return(
                <BannerSmartWatches/>
            )
        }
        if( categoria === '/categories/earphones'){
            return(
                <BannerEarPhones/>
            )
        }
        if( categoria === '/categories/all'){
            return(
                <BannerAllProducts />
            )
        }


}

export default Banner;