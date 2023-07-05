import { Col, Form, Rate, Button, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../../Redux/Features/reviews/clientReviewsSlice';

const desc = ['Terrible', 'Malo', 'Regular', 'Bueno', 'Excelente'];
const { TextArea } = Input;

const ReviewForm = (props) => {
    const token = localStorage.getItem('token');
    const [rating, setRating] = useState(3);
    const [comment, setComment] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { productId, orderId } = props;
    const key = `${ productId } - ${ orderId }`;

    useEffect(() => {
        form.setFieldsValue({ rating });
    }, [rating]);

    const onFinish = (values) => {
        dispatch(createReview({ values, token }));
        form.resetFields();
        props.closeModal();
        messageApi.open({
            key, 
            type: 'loading', 
            content: 'Enviando...'
        });
        setTimeout(() => {
            messageApi.open({
                key, 
                type: 'success', 
                content: '¡Review enviada exitosamente!', 
                duration: 2
            });
        }, 1000);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Col align='middle'>
            <Form
                form={ form }
                name={ `dispatchForm - ${ productId } - ${ orderId }` }
                style={{ maxInlineSize: 400 }}
                onFinish={ onFinish }
                onFinishFailed={ onFinishFailed }
                autoComplete="off"
            >
                <Form.Item
                    label="Rating:"
                    name="rating"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese una calificación',
                        }
                    ]}
                >
                    <span>
                        <Rate tooltips={ desc } value={ rating } onChange={ setRating } />
                        { rating ? <span className='ant-rate-text'>{ desc[rating - 1] }</span> : '' }
                    </span>
                </Form.Item>
            
                <Form.Item
                    label="Comentario:"
                    name="comment"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese un comentario',
                        }
                    ]}
                >
                    <TextArea 
                        rows={ 4 } 
                        value={ comment }
                        onChange={ (e) => setComment(e.target.value) }
                        placeholder='Por favor comente qué tal le pareció el producto' 
                    />
                </Form.Item>

                <Form.Item
                    name='productId' 
                    initialValue={ productId }
                    noStyle
                >
                    <Input type='hidden' />
                </Form.Item>

                <Form.Item>
                    { contextHolder }
                    <Button type="primary" htmlType="submit">
                        Enviar
                    </Button>
                </Form.Item>
            </Form>
        </Col>
    );
};

export default ReviewForm;