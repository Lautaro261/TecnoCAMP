import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { getItems } from "../../Redux/Features/productsClient/productsClientSlice";

const Lading = ()=>{

    const dispatch = useDispatch();
    //const allCategories = useSelector((state)=>state.productsClient.allCategories); 
    
    useEffect(()=>{
        dispatch(getItems());
        console.log('Me despaché! GETALLCATEGORIES');
    }, []) 

    return(
        <div>
           <Link to='/home'>
                <h1>
                Bienvenido! 
                </h1>
            </Link> 
        </div>
    )
}

export default Lading;