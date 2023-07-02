import React from "react";
import { Row, Col} from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import IconCart from "./IconCart";
import IconFavorite from "./IconFavorite";
import IconProfile from "./IconProfile";
import IconHistory from "./iconHistory";
import IconLogin from "./IconLogin";
import Logout from "../../../Logout/Logout";
import LogoutAuth from "../../../LogoutAuth/LogoutAuth";


const Icons = () => {
  const {isAuthenticated} = useAuth0()
  // const navigate = useNavigate()
  // const userSession = useSelector(state  => state.logInAndSignUp.userSession)

  // const openmodal=()=>{
  //   Modal.warning({
  //     title: 'Lo sentimos mucho😕',
  //     icon: <ExclamationCircleOutlined />,
  //     content: 'Este usuario se encuentra restringido de nuestra plataforma. Si crees que esto es un error, ponte en contacto con nosotros',
  //     okText: 'Aceptar',
  //   })
  // }

//   useEffect(() => {
//     if (userSession.token && userSession.rol) {
//       const token = userSession.token;
//       const rol = userSession.rol;
//       const banned=userSession.erased;
//       if (banned){
//         openmodal()
//         console.log("te banearon puto")
//       }else{

//       console.log('logueado en el front como: ', rol, 'token: ', token, 'banned: ',banned);
//       // setToken(token);
//       // setRol(rol);
//       window.localStorage.setItem('rol', rol);
//       window.localStorage.setItem('token', token);

//       // if (rol === 'client') {
//       //   navigate('/home');
//       // } else if (rol === 'admin') {
//       //   navigate('/admin/home');
//       // } else if (rol === 'superAdmin') {
//       //   navigate('/super/admins');
//       // }
//     }
//   }
// },[userSession.token])


  const rol = window.localStorage.getItem('rol');
  const token = window.localStorage.getItem('token');
  // const { isAuthenticated } = useAuth0();

  return (
    <div>
      {rol && rol === 'client' && token // cuando se corrija la ruta de login para usuarios auth0 esta consulta 'isAuthenticated' se borra de aqui.
        ? <Row justify="center" >
          <Col span={4} ><IconCart /></Col>
          <Col span={4}><IconHistory/></Col>
          <Col span={4}><IconProfile /></Col>
          <Col span={4}><IconFavorite /></Col>

          {isAuthenticated ? <Col span={4}><LogoutAuth /></Col> : <Col span={4}><Logout /></Col>}
        </Row>
        : <Row justify='end' align="top">
          <Col span={6}><IconLogin /></Col>
        </Row>
      }
    </div>
  )
}
export default Icons;