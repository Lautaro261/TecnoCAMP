import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setPhotos } from '../../../Redux/Features/SuperAdmin/photoSuperAdmin/photoSuperAdminSlice';
import { Button } from "antd";

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
        <Button                
        onClick = { handleClick }>
            Cargar Foto
        </Button>
    )
};

export default UploadWidget;