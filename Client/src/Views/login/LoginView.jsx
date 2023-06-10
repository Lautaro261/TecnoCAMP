import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
import { Divider } from 'antd';

const LoginView =({setToken, setRol})=>{
    return(
        <div>
            <Divider style={{color:"black",}}>Iniciar sesion: </Divider>
            <Login setToken={setToken} setRol={setRol}/>
            <Divider style={{color:"black",}}>Registrarse: </Divider> 
            <SignUp/>
        </div>
    )
} 



export default LoginView;