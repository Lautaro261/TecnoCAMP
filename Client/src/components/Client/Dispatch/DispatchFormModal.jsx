import { Col, Button, Modal } from 'antd';
import { useState } from 'react';
import DispatchForm from './DispatchForm';

const DispatchFormModal = () => {
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
                Llenar formulario de entrega
            </Button>
            <Modal 
                title='Formulario para entrega' 
                open={ isModalOpen } 
                footer={ null }
                onCancel= { handleCancel } 
            >
                <DispatchForm />
            </Modal>
        </Col>
    );
};

export default DispatchFormModal;