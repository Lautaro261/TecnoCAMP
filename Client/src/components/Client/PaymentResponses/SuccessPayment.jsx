import { Row, Col, Button, Descriptions } from 'antd';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postPaymentNotification } from '../../../Redux/Features/payment/paymentSlice';

const SuccessPayment = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const { 
        collection_id, 
        collection_status, 
        payment_id, 
        status, 
        external_reference, 
        payment_type, 
        merchant_order_id, 
        preference_id, 
        site_id, 
        processing_mode, 
        merchant_account_id 
    } = Object.fromEntries(params.entries());

    const dispatch = useDispatch();
    const queryParams = `collection_id=${ collection_id }&` + 
        `preference_id=${ preference_id }&` + 
        `collection_status=${ collection_status }`;

    useEffect(() => {
        dispatch(postPaymentNotification(queryParams));
    }, []);

    return (
        <Row justify='center' style={{ margin: '30px' }}>
            <Col span={ 16 }>
                <Descriptions 
                    title='Successful Payment Confirmation' 
                    layout='vertical' bordered
                    style={{ marginBlockEnd: '20px' }}
                >
                    <Descriptions.Item label='Collection ID'>{ collection_id }</Descriptions.Item>
                    <Descriptions.Item label='Collection Status'>{ collection_status }</Descriptions.Item>
                    <Descriptions.Item label='Payment ID'>{ payment_id }</Descriptions.Item>
                    <Descriptions.Item label='Status'>{ status }</Descriptions.Item>
                    <Descriptions.Item label='External Reference'>{ external_reference }</Descriptions.Item>
                    <Descriptions.Item label='Payment Type'>{ payment_type }</Descriptions.Item>
                    <Descriptions.Item label='Merchant Order ID'>{ merchant_order_id }</Descriptions.Item>
                    <Descriptions.Item label='Preference ID'>{ preference_id }</Descriptions.Item>
                    <Descriptions.Item label='Site ID'>{ site_id }</Descriptions.Item>
                    <Descriptions.Item label='Processing Mode'>{ processing_mode }</Descriptions.Item>
                    <Descriptions.Item label='Merchant Account ID'>{ merchant_account_id }</Descriptions.Item>
                </Descriptions>
                <Row justify='center' gutter={ 48 }>
                    <Col>
                        <Link to='/home'>
                            <Button type='primary'>Home</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to='/all-categories'>
                            <Button type='primary'>Seguir comprando</Button>
                        </Link>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default SuccessPayment;