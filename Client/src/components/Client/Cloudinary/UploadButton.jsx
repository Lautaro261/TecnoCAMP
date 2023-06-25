import { Row, Col } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import UploadWidget from './UploadWidget';
import { removePhoto } from '../../../Redux/Features/photos/photosSlice';

const UploadButton = () => {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photos.photos);

    const handleClick = (e, photo) => {
        dispatch(removePhoto(photo));
    };

    return (
        <Col>
            <UploadWidget/>
            <Row>{ photos.length > 0 ? 'Usted cargó las siguientes fotos:' : null }</Row>
            <Row style={{ margin: '10px' }}>
                { photos.map((photo, index) => (
                    <button 
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
                    </button>
                )) }
            </Row>
        </Col>
    );
};

export default UploadButton;