import { Row, Col, Button } from 'antd';
import DispatchFormModal from "./DispatchFormModal";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DispatchButtons = () => {
    const paymentOrderResponse = useSelector(state => state.payment.paymentOrderResponse);
    const cart = useSelector(state => state.payment.cart);

    return (
        <Row justify='center' style={{ margin: '30px' }}>
            { cart.length > 0 && 
                <Col align='middle'>
                    <DispatchFormModal />
                    <Row style={{ margin: '20px'}}>
                        { paymentOrderResponse && paymentOrderResponse.payment_link && 
                            <Link to={ paymentOrderResponse && paymentOrderResponse.payment_link }>
                                <Button>Continuar con el Pago</Button>
                            </Link> 
                        }
                    </Row>
                </Col>
            }
        </Row>
    );
};

export default DispatchButtons;