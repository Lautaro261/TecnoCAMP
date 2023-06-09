import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
import { Divider } from 'antd';

const LoginView =({setToken, setRol})=>{
    return(
        <div>
            <SignUp/>
            <Divider style={{color:"black",}}>Registrarse: </Divider>
            <Login setToken={setToken} setRol={setRol}/>
        </div>
    )
} 



export default LoginView;