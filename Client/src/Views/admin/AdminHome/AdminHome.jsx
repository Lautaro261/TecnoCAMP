import { useEffect } from "react";
const AdminHome = ()=>{
    const rol = window.localStorage.getItem("rol");
    useEffect(()=>{
        console.log('monto adminHome',rol )
    },[])


    console.log( window.localStorage.getItem("rol"), 'desde adminHome')
    return (
        <div>
            <h3>SOY ADMIN PA </h3>
        </div>
    )

}

export default AdminHome;