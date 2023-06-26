import { Col, Button, Modal } from 'antd';
import { useState } from 'react';
import DispatchForm from './DispatchForm';

const DispatchFormModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Col>
            <Button type='primary' onClick={ showModal }>
                Llenar forma para entrega
            </Button>
            <Modal 
                title='Forma para entrega' 
                open={ isModalOpen } 
                onOk={ handleOk } 
                okText="Continuar"
                onCancel= { handleCancel } 
            >
                <DispatchForm />
            </Modal>
        </Col>
    );
};

export default DispatchFormModal;