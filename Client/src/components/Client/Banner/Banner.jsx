import React from "react";
import BannerEarPhones from "./BannerEarPhones/BannerEarPhones";
import BannerSmartPhones from "./BannerSmartPhones/BannerSmartPhones";
import BannerSmartWatches from "./BannerSmartWatches/BannerSmartWatches";
import BannerAllProducts from "./BannerAllProducts/BannerAllProducts";

const Banner = ({categoria}) => {

 
        if( categoria === '/categories/f2f573c2-3278-4f3e-888d-7fbde488e645'){
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
        else{
            return(
                <BannerAllProducts />
            )
        }


}

export default Banner;