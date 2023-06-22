import React from 'react';
import { useAuth0 }from '@auth0/auth0-react';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const LogoutAuth = () => {

    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);


    const { logout }  = useAuth0()
    const handleLogoutAuth = () => {
        logout()
        localStorage.clear()

        navigate('/home')
    }

    const showPopconfirm = () => {
        setOpen(true);
    }
    
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        },2000)
        handleLogoutAuth();
    }

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
 export default LogoutAuth;