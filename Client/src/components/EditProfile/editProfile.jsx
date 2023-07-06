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
import { Fill, SaveProfile } from "../../Redux/Features/profile/profileSlice";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd'; 
import UploadButton from "../Client/Cloudinary/UploadButton";
import { resetPhotos } from "../../Redux/Features/photos/photosSlice";





const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const EditProfile = () => {
  const token=window.localStorage.getItem("token")
  const profile= useSelector(state=>state.profile.profiledat)
  const dispatch=useDispatch()
  const photos = useSelector(state => state.photos.photos);


  useEffect(()=>{
    dispatch(resetPhotos([]));
    dispatch(Fill(token))
  }, [])


  const [componentDisabled, setComponentDisabled] = useState(false);
  console.log(profile, "aaaaaa")


  const onFinish=(values)=>{
    const valuesSend={...values, photo:photos[0]?photos[0]:undefined}
    const NewValues = Object.keys(valuesSend).reduce((resultado, key) => {
      if (valuesSend[key] !== undefined) {
        resultado[key] = valuesSend[key];
      }
      return resultado;
    }, {});
    dispatch(SaveProfile([token, NewValues])).then(location.reload())
    

  }

  return (
    <>
      <br />
      <br />
      {profile.profile ? <div>
      <Row gutter={16}>
        <Col span={24}>
        <Col span={8}>
        <Avatar shape="square" size={200} icon={<UserOutlined />} src={profile.photo}/>
        </Col>
        <Col span={8}>
          <h1 style={{color:"black"}}>{profile.name? `Bienvenido/a, ${profile.name}`:`Bienvenido/a` }</h1>
        </Col>
        </Col>
      </Row>
      <Row gutter={16}>
        {/* <Col span={8}>
        </Col> */}

        {/* <Col span={8}>
          

        </Col>
        <Col span={8}>
        </Col> */}
      </Row>
      <Row gutter={16}>
        {/* <Col span={8}>
          <h1 style={{color:"black"}}>mnmn</h1>
        </Col> */}
        <Col span={24}>
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
        {/* <Col span={8}></Col> */}
        <Col span={24} style={{marginTop:'5vh'}}>
          <button
            style={{border:"0px", cursor:"pointer", color:"blue"}}
            onChange={() => setComponentDisabled(!componentDisabled)}
            onClick={() => setComponentDisabled(!componentDisabled)}
          >
            Editar perfil
          </button>
        </Col>
      </Row>
      </div>:null}



    {componentDisabled ? 
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
       
        style={{
          maxWidth: "50vw", marginLeft:"20vw"
        }}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
            label="Nombre"
            name="name">
              <Input defaultValue={profile.name}/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item 
            label="Apodo"
            name="nickname">
              <Input defaultValue={profile.profile.nickname}/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
        <Col span={12}>
            <Form.Item 
            label="Direccion"
            name="address">
              <Input defaultValue={profile.profile.address}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
            label="Pais"
            name="country">
              <Input defaultValue={profile.profile.country}/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
            label="Ciudad "
            name="city">
              <Input defaultValue={profile.profile.city}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
            label="Barrio "
            name="neighborhood">
              <Input defaultValue={profile.profile.neighborhood}/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>

          <Col span={12}>
            <Form.Item 
            label="Telefono"
            name="phone"
               >
              <Input defaultValue={profile.profile.phone} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Foto de Perfil"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          {photos.length<1 && <UploadButton/> }
          {photos && <img src={photos[0]} style={{width:"20vw"}}/> }
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit">Guardar Cambios</Button>
        </Form.Item>
      </Form>:null}
    </> 
  );
};

export default EditProfile;
