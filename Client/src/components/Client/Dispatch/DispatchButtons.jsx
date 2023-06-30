import { Row, Col, Button } from 'antd';
import DispatchFormModal from "./DispatchFormModal";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DispatchButtons = () => {
    const cart = useSelector(state => state.payment.cart);

    return (
        <Row justify='center' style={{ margin: '30px' }}>
            { cart.length > 0 && 
                <Col align='middle'>
                    <DispatchFormModal />
                </Col>
            }
        </Row>
    );
};

export default DispatchButtons;