import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginAuth = () => {
    const { loginWithRedirect } = useAuth0();

    return (
         <button onClick={() => loginWithRedirect()}>Ingresar con google</button>
         )
}

export default LoginAuth;