import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Upload,
} from "antd";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, message } from 'antd'; 
import UploadButton from "../../Client/Cloudinary/UploadButton";
import { ViewProfile, SaveProfile, updateProfileData } from "../../../Redux/Features/SuperAdmin/profileSuperAdmin/profileSuperAdminSlice";
import { resetPhotos } from "../../../Redux/Features/photos/photosSlice";

const EditProfile = () => {
  const token = window.localStorage.getItem("token")
  const dispatch=useDispatch()
  const profile = useSelector(state=>state.profileSuperAdmin.profileData)
  const photos = useSelector(state => state.photos.photos);
  const profileData = useSelector(state => state.profileSuperAdmin.profileData);
  const [form] = Form.useForm();

    // Crear objeto initialValues con los valores correspondientes
    const initialValues = {
      name: profile?.name,
      nickname: profile?.profile?.nickname,
      address: profile?.profile?.address,
      country: profile?.profile?.country,
      city: profile?.profile?.city,
      neighborhood: profile?.profile?.neighborhood,
      phone: profile?.profile?.phone,
    };

  useEffect(()=>{
    dispatch(resetPhotos([]));
    dispatch(ViewProfile(token))
  }, [])

  const [componentDisabled, setComponentDisabled] = useState(false);

  const showSuccessMessage = () => {
    message.success("¡Datos Actualizados Correctamente!");
  };

  const onFinish=(values)=>{
    const valuesSend={...values, photo:photos[0]?photos[0]:undefined, phone: values.phone ? values.phone:null }
    const NewValues = Object.keys(valuesSend).reduce((resultado, key) => {
      if (valuesSend[key] !== undefined) {
        resultado[key] = valuesSend[key];
      }
      return resultado;
    }, {});
    showSuccessMessage();
    dispatch(SaveProfile([token, NewValues]))
      .then((response) => {
        // Actualizar el estado profileData con los nuevos valores
        setComponentDisabled(false),
        dispatch(updateProfileData(response.payload));
      })
  }


  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div       
    align="left"
    style={{
      paddingLeft: "31px",
    }}>
      {profile.profile ? <div style={{ width:"50vw", paddingTop: "22px"}}>
      <Row gutter={16}>
        <Col span={8}>
        <Avatar shape="square" size={200} icon={<UserOutlined />} src={profile?.photo}/>
        </Col>
        <Col span={8}>
          <h1 style={{color:"black", marginLeft:"31px"}}>{profile?.name? `Bienvenido/a, ${profile?.name}`:`Bienvenido/a` }</h1>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
        </Col>

        <Col span={8}>
          

        </Col>
        <Col span={8}>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <h1 style={{color:"black"}}></h1>
        </Col>
        <Col span={8}>
          <h3 style={{color:"black"}}>Datos Personales</h3>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <p style={{color:"black"}}>Nombre: {profile.name}</p>
        </Col>

        <Col span={8}>
          <p style={{color:"black"}}>Apodo: {profile.profile.nickname}</p>
        </Col>
        <Col span={8}>
          <p style={{color:"black"}}>email: {profile.email}</p>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <p style={{color:"black"}}>Direccion: {profile.profile.address}</p>
        </Col>

        <Col span={8}>
          <p style={{color:"black"}}>Ciudad: {profile.profile.city}</p>
        </Col>
        <Col span={8}>
          <p style={{color:"black"}}>Barrio: {profile.profile.neighborhood}</p>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>

        </Col>

        <Col span={8}>
          <p style={{color:"black"}}>Teléfono: {profile.profile.phone}</p>
        </Col>
        <Col span={8}>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}></Col>
        <Col span={8}>
          <Button
        style={{
          backgroundColor: "#0088ff",
          color: "#ffff",
          marginTop:"22px"
        }}
            onChange={() => setComponentDisabled(!componentDisabled)}
            onClick={() => setComponentDisabled(!componentDisabled)}
          >
            Editar perfil
          </Button>
        </Col>
      </Row>
      </div>:null}



    {componentDisabled ? 
      <Form
      form={form}
        labelCol={{
          span: 5,
          offset: 1,
        }}
        wrapperCol={{
          span: 12,
          offset: 1,
        }}
        layout="horizontal"
       
        style={{
          maxWidth: "70vw", paddingTop:"31px", paddingBottom:"22px"
        }}
        initialValues={initialValues} // Utiliza initialValues para establecer los valores iniciales
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
            label="Nombre"
            name="name"
            rules={[
              {
                required: true,
                min: 3,
                message: 'Ingrese al menos 3 caracteres',
              },
            ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item 
            label="Apodo"
            name="nickname">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
        <Col span={12}>
            <Form.Item 
            label="Direccion"
            name="address">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
            label="Pais"
            name="country">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
            label="Ciudad "
            name="city">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
            label="Barrio "
            name="neighborhood">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>

          <Col span={12}>
            <Form.Item 
            label="Telefono"
            name="phone"
               >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Foto de Perfil"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          {photos.length < 1 && <UploadButton/> }
          {photos && <img src={photos[0]} style={{width:"20vw"}}/> }
        </Form.Item>
        <Form.Item           
        align="center"
        >
          <Button         
          style={{
          backgroundColor: "#009975",
          color: "#ffff",
        }}
        type="primary" htmlType="submit">Guardar Cambios</Button>
        </Form.Item>
      </Form>:null}
    </div> 
  );
};

export default EditProfile;
