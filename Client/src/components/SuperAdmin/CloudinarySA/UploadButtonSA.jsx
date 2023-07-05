import { Row, Col } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import UploadWidget from './UploadWidgetSA';
import { removePhoto } from '../../../Redux/Features/SuperAdmin/photoSuperAdmin/photoSuperAdminSlice';
import { Button } from "antd";

const UploadButton = () => {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photoSuperAdmin.photos);

    const handleClick = (e, photo) => {
        dispatch(removePhoto(photo));
    };

    return (
        <Col>
            <UploadWidget/>
            <Row>{ photos.length > 0 ? 'Usted cargó las siguientes fotos:' : null }</Row>
            <Row style={{ margin: '10px' }}>
                { photos.map((photo, index) => (
                    <Button 
                        key={ index } 
                        onClick={ (e) => handleClick(e, photo) } 
                        style={{ margin: '5px', background:"transparent",  }}
                    >
                        <Col>
                            <Row justify='end'>
                            <CloseSquareFilled />
                            </Row>
                            <img 
                                src={ photo } 
                                alt={ `photo ${ index }` } 
                                style={{ blockSize: '10vh' }} 
                            />
                        </Col>
                    </Button>
                )) }
            </Row>
        </Col>
    );
};

export default UploadButton;