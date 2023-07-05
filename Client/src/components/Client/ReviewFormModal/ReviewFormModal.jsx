import { Col, Button, Modal } from 'antd';
import { useState } from 'react';
import ReviewForm from '../ReviewForm/ReviewForm';

const ReviewFormModal = (props) => {
    const { productId, orderId } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Col>
            <Button type='primary' onClick={ showModal }>
                Dejar Review
            </Button>
            <Modal 
                title='Formulario para calificación de producto' 
                open={ isModalOpen } 
                footer={ null }
                onCancel= { handleCancel } 
            >
                <ReviewForm productId={ productId } orderId={ orderId } closeModal={ handleCancel } />
            </Modal>
        </Col>
    );
};

export default ReviewFormModal;