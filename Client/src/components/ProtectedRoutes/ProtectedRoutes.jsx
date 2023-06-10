import { Navigate, Outlet } from "react-router-dom"


const ProtectedRoutes =({ allowed, logged, children, redirect="/login"})=>{
    if (!allowed){
        if(!logged){
            return <Navigate to="/login" />
        }
        return <Navigate to={redirect} />
    }
    return children ? children : <Outlet/>
}

export default ProtectedRoutes; 
