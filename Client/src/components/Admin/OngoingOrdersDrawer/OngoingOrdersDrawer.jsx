import { Button, Space, Form, Input, Select, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    changeOrderShippingStatus, 
    getAllOngoingOrders, 
    setShippingStatusResponse 
} from '../../../Redux/Features/admin/ongoingOrders/ongoingOrdersSlice';

const { Option } = Select;

const OngoingOrdersDrawer = (props) => {
    const token = localStorage.getItem('token');
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const shippingStatusResponse = useSelector(state => state.ongoingOrders.shippingStatusResponse);

    const { orderId, contact_name, contact_cellphone, address, neighborhood } = props;

    useEffect(() => {
        if (shippingStatusResponse.shipping_status) {
            dispatch(getAllOngoingOrders(token));
            dispatch(setShippingStatusResponse({}));
        }
    }, [shippingStatusResponse.shipping_status]);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        const values = await form.validateFields();
        try {
            dispatch(changeOrderShippingStatus({ values, token, orderId }));
            form.resetFields();
            setOpen(false);
        } catch (errorInfo) {
            console.log('Validation Failed:', errorInfo);
        }
    };

    return (
        <>
            <Button type='primary' onClick={ showDrawer }>
                Cambiar Estado de Envío
            </Button>
            <Drawer
                title="Cambiar Estado de Envío"
                width={ 400 }
                onClose={ onClose }
                open={ open }
                extra={
                    <Space>
                        <Button onClick={ onClose }>Cancelar</Button>
                        <Button type='primary' onClick={ handleSubmit }>
                            Enviar
                        </Button>
                    </Space>
                }
            >
                <Form form={ form }>
                    <Form.Item
                        name='shipping_status' 
                        label='Estado de Envío' 
                        rules={[
                            {
                                required: true, 
                                message: 'Por favor elija un estado de envío'
                            }
                        ]}
                    >
                        <Select placeholder='Por favor elija un estado de envío'>
                            <Option value='En preparacion'>En preparación</Option>
                            <Option value='Despachado'>Despachado</Option>
                            <Option value='Entregado'>Entregado</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='contact_name' 
                        initialValue={ contact_name }
                        noStyle
                    >
                        <Input type='hidden' />
                    </Form.Item>

                    <Form.Item
                        name='contact_cellphone' 
                        initialValue={ contact_cellphone }
                        noStyle
                    >
                        <Input type='hidden' />
                    </Form.Item>

                    <Form.Item
                        name='address' 
                        initialValue={ address }
                        noStyle
                    >
                        <Input type='hidden' />
                    </Form.Item>

                    <Form.Item
                        name='neighborhood' 
                        initialValue={ neighborhood }
                        noStyle
                    >
                        <Input type='hidden' />
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default OngoingOrdersDrawer;