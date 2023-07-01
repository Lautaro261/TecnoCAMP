import React from 'react';
import { useAuth0 }from '@auth0/auth0-react';
import { LogoutOutlined } from '@ant-design/icons';
import {Popconfirm , Row, Col, Tooltip} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutOwn } from '../../Redux/Features/login/logInAndSignUpSlice';


const LogoutAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const { logout }  = useAuth0()

    const handleLogoutAuth = () => {
        dispatch(logoutOwn())    
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('rol');
        logout()
       // navigate('/')
    }

    const showPopconfirm = () => {
        setOpen(true);
    }
    
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        },1000)
        handleLogoutAuth();

        navigate('/home')
    }

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <Row >
        <Col span={24}>
            <Popconfirm
                title=""
                description="¿Desea cerrar sesión?"
                open={open}
                onConfirm={handleOk}
                okButtonProps={{
                    loading: confirmLoading,
                }}
                onCancel={handleCancel}
            >
                <Tooltip title='Cerrar sesión'>
                <button onClick={showPopconfirm} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <LogoutOutlined style={{ fontSize: '28px', color: '#6699FF' }} />
                    {/* <DeleteOutlined style={{ fontSize: '28px', color: '#6699FF' }}/> */}
                </button>
                </Tooltip>
            </Popconfirm>
        </Col>
    </Row>
    )
}
 export default LogoutAuth;