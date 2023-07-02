import { Row, Col, Button, Modal } from 'antd';
import { useState } from 'react';

const OngoingOrdersDetails = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { 
        orderId, 
        transaction_id, 
        date_time, 
        contact_name, 
        contact_cellphone, 
        total_quantity_all_products, 
        total_amount_all_products, 
        department, 
        municipality, 
        address, 
        neighborhood, 
        products 
    } = props;

    const date = new Date(date_time);
    const formattedDate = date.toISOString().slice(0, 10);
    const formattedTime = date.toTimeString().slice(0, 8);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <Button type='primary' onClick={ showModal }>
                Detalles
            </Button>
            <Modal 
                title='Detalles de la Orden' 
                open={ isModalOpen } 
                onOk={ handleOk } 
                onCancel={ handleCancel } 
            >
                <Col>
                    <Col>
                        { products.map(product => (
                            product.inventoryIds.map(item => (
                                <Row key={ item.id } justify='center' align='middle'>
                                    <Col>
                                        <Row><b style={{ marginInlineEnd: '5px' }}>Nombre:</b>{ product.name }</Row>
                                        <Row>
                                            <Col>
                                                <b>Color:</b> 
                                            </Col>
                                            <Col>
                                                <Row style={{ blockSize: '20px', inlineSize: '20px', marginInlineStart: '5px', borderRadius: '50%', backgroundColor: item.color }}></Row>
                                            </Col>
                                        </Row>
                                        <Row><b style={{ marginInlineEnd: '5px' }}>Precio:</b>COL$ { product.price }</Row>
                                        <Row><b style={{ marginInlineEnd: '5px' }}>Cantidad:</b>{ item.quantity_unit_product }</Row>
                                    </Col>
                                    <Col>
                                        <img src={ product.photo[0] } alt={ product.name } style={{ inlineSize: '15vw' }} />
                                    </Col>
                                </Row>
                            ))
                        )) }
                    </Col>
                    <Col>
                        <Row><b style={{ marginInlineEnd: '5px' }}>Número de Orden:</b>{ orderId }</Row>
                        <Row><b style={{ marginInlineEnd: '5px' }}>ID de Transacción:</b>{ transaction_id }</Row>
                        <Row><b style={{ marginInlineEnd: '5px' }}>Fecha de Pago:</b>{ formattedDate }</Row>
                        <Row><b style={{ marginInlineEnd: '5px' }}>Hora de Pago:</b>{ formattedTime }</Row>
                        <Row><b style={{ marginInlineEnd: '5px' }}>Nombre:</b>{ contact_name }</Row>
                        <Row><b style={{ marginInlineEnd: '5px' }}>Celular:</b>{ contact_cellphone }</Row> 
                        <Row><b style={{ marginInlineEnd: '5px' }}>Cantidad Total de Productos:</b>{ total_quantity_all_products }</Row>
                        <Row><b style={{ marginInlineEnd: '5px' }}>Precio Total:</b>COP$ { total_amount_all_products }</Row>
                        <Row><b style={{ marginInlineEnd: '5px' }}>Departamento:</b>{ department }</Row>
                        <Row><b style={{ marginInlineEnd: '5px' }}>Municipio:</b>{ municipality }</Row>
                        <Row><b style={{ marginInlineEnd: '5px' }}>Dirección:</b>{ address }</Row>
                        <Row><b style={{ marginInlineEnd: '5px' }}>Vecindario:</b>{ neighborhood }</Row>
                    </Col>
                </Col>
            </Modal>
        </>
    );
};

export default OngoingOrdersDetails;