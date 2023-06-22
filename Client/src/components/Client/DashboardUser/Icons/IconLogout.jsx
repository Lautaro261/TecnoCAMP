import React, { useState } from "react";
import { LogoutOutlined } from '@ant-design/icons';
import { Row, Col, Popconfirm } from 'antd';
import { useNavigate } from "react-router-dom";

const IconLogout = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleLogout = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('rol')

        console.log('te deslogueaste')
        navigate('/home')
    }

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
        handleLogout(); 
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
                        <LogoutOutlined style={{ fontSize: '28px', color: '#6699FF' }} />
                    </button>
                </Popconfirm>
            </Col>
        </Row>
    )
}

export default IconLogout;