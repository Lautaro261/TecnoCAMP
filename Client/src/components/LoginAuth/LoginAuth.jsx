import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Tooltip} from 'antd';


const LoginAuth = () => {
    const { loginWithRedirect } = useAuth0();

    return (

        <Tooltip title="Google">
        <Button type="primary"  danger onClick={() => loginWithRedirect()} >Google</Button>
      </Tooltip>
      
         )
}

export default LoginAuth;