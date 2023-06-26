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
        dispatch(getAllMunicipalities((value)));
    };

    const onFinish = async (values) => {

    dispatch(createPaymentOrder(values)); 
        
       /*  const updatedValues = {
            ...values,
            departmentId: values.departmentId.toString() // Convertir a cadena de texto
          };
          dispatch(createPaymentOrder(updatedValues)); */
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
                            message: 'Ingrese un nombre',
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
                            message: 'Ingrese un número de contacto',
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
                            message: 'Ingrese un departamento',
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
                            message: 'Ingrese un municipio',
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
                            message: 'Ingrese una dirección',
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
                            message: 'Ingrese un vecindario',
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