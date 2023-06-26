import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setPhotos } from '../../../Redux/Features/photos/photosSlice';

const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;

const UploadWidget = () => {
    const dispatch = useDispatch();
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: VITE_CLOUD_NAME,
            uploadPreset: VITE_UPLOAD_PRESET
        }, (error, result) => {
            if (!error && result && result.event === 'success') {
                dispatch(setPhotos(result.info.secure_url));
            }
        });
    }, [dispatch]);

    const handleClick = () => {
        widgetRef.current.open();
    };

    return (
        <button type='button' onClick = { handleClick }>
            Cargar Foto
        </button>
    )
};

export default UploadWidget;