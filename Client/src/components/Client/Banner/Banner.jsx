import React from "react";
import BannerEarPhones from "./BannerEarPhones/BannerEarPhones";
import BannerSmartPhones from "./BannerSmartPhones/BannerSmartPhones";
import BannerSmartWatches from "./BannerSmartWatches/BannerSmartWatches";
import BannerAllProducts from "./BannerAllProducts/BannerAllProducts";

const Banner = ({categoria}) => {

 
        if( categoria === 'smartphones'){
            return(
                <BannerSmartPhones/>
            )
        }
        if( categoria === 'smartwatches'){
            return(
                <BannerSmartWatches/>
            )
        }
        if( categoria === 'earphones'){
            return(
                <BannerEarPhones/>
            )
        }
        if( categoria === 'all'){
            return(
                <BannerAllProducts />
            )
        }


}

export default Banner;