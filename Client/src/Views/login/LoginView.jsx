import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
import { Divider } from 'antd';
import LoginAuth from '../../components/LoginAuth/LoginAuth';

const LoginView =({setToken, setRol})=>{
    return(
        <>

        <div style={{ width:"100vw",background:"linear-gradient(0deg, rgba(20,34,103,1) 0%, rgba(88,181,194,1) 100%)", height:"100vh"}}>

        <div style={{ position:"fixed",left:"25vw", top:"15vh", width:"50vw", backgroundColor:"white", borderRadius: "30px", boxShadow: "-43px 30px 49px -4px rgba(0,0,0,0.59)"}}>
            <Divider orientation='left' style={{color:"black",}}>Iniciar sesion: </Divider>
            {/* <Login setToken={setToken} setRol={setRol}/> */}
            <LoginAuth />
            <Divider orientation="left"style={{color:"black",}}>Registrarse: </Divider> 
            <SignUp/>
        </div>
        </div>
        <div>
             <LoginAuth />
        </div>

        </>
    )
} 



export default LoginView;