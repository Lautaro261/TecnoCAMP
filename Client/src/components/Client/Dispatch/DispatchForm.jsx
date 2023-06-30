import { Col, Button, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCartForAUser, 
    createPaymentOrder,
    getAllDepartments,
    getAllMunicipalities,
} from '../../../Redux/Features/payment/paymentSlice';

const DispatchForm = () => {
    const clientToken = localStorage.getItem('token');
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const allDepartments = useSelector(state => state.payment.allDepartments);
    const allMunicipalities = useSelector(state => state.payment.allMunicipalities);
    const paymentOrderResponse = useSelector(state => state.payment.paymentOrderResponse);

    useEffect(() => {
        dispatch(getAllDepartments());
    }, []);

    useEffect(() => {
        if (paymentOrderResponse.payment_link) {
            window.open(paymentOrderResponse.payment_link);
        }
    }, [paymentOrderResponse.payment_link]);

    const handleChange = (value) => {
        form.setFieldsValue({ municipalityId: '' })
        dispatch(getAllMunicipalities(parseInt(value)));
    };

    const onFinish = (values) => {
        dispatch(createPaymentOrder({ values, clientToken }));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Col align='middle'>
            <Form
                form={form}
                name="dispatchForm"
                style={{ maxInlineSize: 400 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Nombre de contacto:"
                    name="contact_name"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese un nombre',
                        },
                        {
                            pattern: /^[A-Za-z\s]+$/,
                            message: 'Solo puede ingresar letras'
                        }
                    ]}
                >
                    <Input placeholder="Ej. Juan Pérez" />
                </Form.Item>

                <Form.Item
                    label="Número de celular:"
                    name="contact_cellphone"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese un número de contacto',
                        },
                        {
                            pattern: new RegExp(/^[0-9\b]+$/),
                            message: 'Ingrese un número válido',
                        },
                        {
                            max: 10,
                            message: 'El número de celular debe tener máximo 10 dígitos',
                        },
                    ]}
                >
                    <Input type='tel' placeholder='Ej. 1234567890' />
                </Form.Item>

                <Form.Item
                    label="Departmento:"
                    name="departmentId"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese un departamento',
                        }
                    ]}
                >
                    <Select onChange={handleChange} placeholder="Seleccione un departamento">
                        {allDepartments.map(department => (
                            <Select.Option
                                key={department.id}
                                value={department.id}
                            >
                                {department.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Municipio:"
                    name="municipalityId"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese un municipio',
                        }
                    ]}
                >
                    <Select placeholder="Seleccione un municipio">
                        {allMunicipalities.map(municipality => (
                            <Select.Option
                                key={municipality.id}
                                value={municipality.id}
                            >
                                {municipality.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Dirección:"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese una dirección'
                        },
                        {
                            pattern: /^[a-zA-Z0-9\s]+$/,
                            message: 'La dirección solo puede contener letras y números',
                        }
                    ]}
                >
                    <Input placeholder="Ej. Calle 123 #45-67" />
                </Form.Item>

                <Form.Item
                    label="Vecindario:"
                    name="neighborhood"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese un vecindario'
                        },
                        {
                            pattern: /^[a-zA-Z0-9\s]+$/,
                            message: 'El vecindario solo puede contener letras y números',
                        }
                    ]}
                >
                    <Input placeholder="Ej. 12 de Octubre" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Proceder a pagar
                    </Button>
                </Form.Item>
            </Form>
        </Col>
    )
};

export default DispatchForm;