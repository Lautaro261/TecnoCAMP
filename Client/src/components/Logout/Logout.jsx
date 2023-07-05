import React, { useState } from "react";
import { LogoutOutlined } from '@ant-design/icons';
import { Row, Col, Popconfirm, Tooltip } from 'antd';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutOwn } from "../../Redux/Features/login/logInAndSignUpSlice";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    // const { logout } = useAuth0()

    const handleLogout = () => {
        window.localStorage.clear();
        dispatch(logoutOwn());
      
        console.log('te deslogueaste')
        navigate('/');
    }

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 1000);
        handleLogout();
        navigate('/');
    };

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
                        <button onClick={showPopconfirm} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <Tooltip title='Cerrar sesión'>
                            <LogoutOutlined style={{ fontSize: '28px', color: '#6699FF' }} />
                    </Tooltip>
                        </button>
                </Popconfirm>
            </Col>
        </Row>
    )
}

export default Logout;