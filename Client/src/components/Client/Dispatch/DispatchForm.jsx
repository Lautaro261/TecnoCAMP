import { Col, Button, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    createPaymentOrder, 
    getAllDepartments, 
    getAllMunicipalities, 
} from '../../../Redux/Features/payment/paymentSlice';

const DispatchForm = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const allDepartments = useSelector(state => state.payment.allDepartments);
    const allMunicipalities = useSelector(state => state.payment.allMunicipalities);

    useEffect(() => {
        dispatch(getAllDepartments());
    }, []);

    const handleChange = (value) => {
        form.setFieldsValue({ municipalityId: '' })
        dispatch(getAllMunicipalities(parseInt(value)));
    };

    const onFinish = async (values) => {
        dispatch(createPaymentOrder(values));
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Col align='middle'>
            <Form
                form={ form }
                name="dispatchForm"
                style={{ maxInlineSize: 400 }}
                onFinish={ onFinish }
                onFinishFailed={ onFinishFailed }
                autoComplete="off"
            >
                <Form.Item
                    label="Nombre de contacto:"
                    name="contact_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a contact name!',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            
                <Form.Item
                    label="Número de celular:"
                    name="contact_cellphone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a cellphone!',
                        }
                    ]}
                >
                    <Input type='tel' />
                </Form.Item>

                <Form.Item
                    label="Departmento:"
                    name="departmentId"
                    rules={[
                        {
                            required: true,
                            message: 'Please choose a department',
                        }
                    ]}
                >
                    <Select onChange={ handleChange }>
                        { allDepartments.map(department => (
                            <Select.Option 
                                key={ department.id } 
                                value={ department.id }
                            >
                                { department.name }
                            </Select.Option>
                        )) }
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Municipio:"
                    name="municipalityId"
                    rules={[
                        {
                            required: true,
                            message: 'Please choose a municipality',
                        }
                    ]}
                >
                    <Select>
                        { allMunicipalities.map(municipality => (
                            <Select.Option 
                                key={ municipality.id } 
                                value={ municipality.id }
                            >
                                { municipality.name }
                            </Select.Option>
                        )) }
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Dirección:"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input an address!',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Vecindario:"
                    name="neighborhood"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a neighborhood!',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Crear link de pago
                    </Button>
                </Form.Item>
            </Form>
        </Col>
    )
};

export default DispatchForm;