import {
  Button,
  Cascader,
  Form,
  Input,
  Space,
  ColorPicker,
  theme
} from "antd";
import Hola from './Hola';
import { PlusSquareOutlined } from '@ant-design/icons';
import { useState } from "react";
const { TextArea } = Input;

function ProductForm() {

    const [loadings, setLoadings] = useState([]);
    
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };


  const [componentSize, setComponentSize] = useState("default");
 
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const { token } = theme.useToken();

  const [color, setColor] = useState(token.colorPrimary);

  const [countColor, setCountColor]=useState(1)

  const handlerCountColor = ()=>{
    const count = countColor +1;
    setCountColor(count);
  }

  

  const onFinish = (values) => {
    console.log('Enviando...', values); // {name, price, price_promotion, photo,
  };                                                 //  product_description, e_product_type, 
                                                     // brandId,categoryId, colors, quantities}

/*   const onSubmit = (values) => {
    console.log('Success:', values); 
    
  };*/
  
  
/*   const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }; */


  return (
    <Form
    name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onFinish={onFinish}
     /*  onFinishFailed={onFinishFailed} */
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      
      <Form.Item label="Nombre " name="name">

        <Input placeholder="Nombre" />
      </Form.Item>

       {/* <Form.Item label="Marca" name="brand">
        <Cascader
          placeholder="Selecciona producto"
          options={[
            {
              value: "celulares",
              label: "Celulares",
              children: [
                {
                  value: "Samsumg",
                  label: "Samsumg",
                },
                {
                  value: "iphone",
                  label: "iphone",
                },
              ],
            },
            {
              value: "smartwatch",
              label: "smartwhact",
              children: [
                {
                  value: "xiaomi",
                  label: "xiaomi",
                },
                {
                  value: "nokia",
                  label: "nokia",
                },
              ],
            },
          ]}
        />
        </Form.Item> */}

        <Form.Item label='Precio Unitario' name="price">
          <Input placeholder="Precio" />
        </Form.Item>
        
        <Form.Item label='Precio Oferta' name="price_promotion">
          <Input placeholder="Precio" />
        </Form.Item > 
        
{/*         <Form.Item label='Colores'  name="colors">
          <ColorPicker value={color} onChange={setColor} />   
        </Form.Item>   */}
       
        <Form.Item label='Colores'  name="colors">
          <Hola/>   
        </Form.Item> 

        <Button name="count_color" onClick={handlerCountColor}>+ Colores</Button> 

        <Form.Item label='Descripcion' name="product_description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label='Fotos' name="photo">
          <Space direction="vertical">
          <Button
          type="primary"
          icon={<PlusSquareOutlined />}
          loading={loadings[1]}
          onClick={() => enterLoading(1)}
          >
          Agragar Foto
          </Button>
        </Space>
          </Form.Item>

       {/*  <Form.Item label='En Stock' name="stock">
          <Input placeholder="Unidades" />
        </Form.Item> */}
      <Form.Item >
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>

  );
}

export default ProductForm;
