import React from 'react';
import useAuth from '@auth0/auth0-react';
import { LogoutOutlined } from '@ant-design/icons';

const LogoutAuth = () => {
    const { logout }  = useAuth()
    const handleLogoutAuth = () => {
        logout()
        localStorage.clear()
    }

    return (
        <button onClick={handleLogoutAuth} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
        <LogoutOutlined style={{ fontSize: '28px', color: '#6699FF' }} />
    </button>
    )
}

export default LogoutAuth;