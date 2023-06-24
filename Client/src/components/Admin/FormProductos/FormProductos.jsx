import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadButton from '../../Client/Cloudinary/UploadButton';
import ColorPicker from '../ColorPicker/ColorPicker.jsx';
import { getAllCategories } from '../../../Redux/Features/categories/clientCategoriesSlice';
import { getAllBrands } from '../../../Redux/Features/brands/clientBrandsSlice';
const { TextArea } = Input;




const FormProductos = () => {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.clientProducts.photos);
    const allCategories = useSelector(state => state.clientCategories.allCategories);
    const allBrands = useSelector(state => state.clientBrands.allBrands);
    const token = localStorage.getItem('token');
    const[FormColors, SetFormColors]=useState([])
    const[cantidad,setCantidad]=useState([])
    const[color,setcolor]=useState([])


    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllBrands());
    }, []);

    const post= async (values)=> {
        const coloresA = FormColors.map(e=>{return(e[0])})
        const cantidadesA = FormColors.map(e=>{return(e[1])})
        const data= {...values, photo:photos, colors:coloresA, quantities:cantidadesA}
        console.log(data)
        const response = await axios.post('/admin/createproduct', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response
    }
    
    const onFinish = (values) => {
    console.log(FormColors, "todododoo")
      console.log('Success:');
      post(values)
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    
    return(
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Nombre del Producto"
      name="name"
      rules={[
        {
          required: true,
          message: 'porfavor introduce el nombre del artículo',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Precio Unitario"
      name="price"
      rules={[
        {
          required: true,
          message: 'Por Favor colocar un precio',
        },
      ]}
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="Precio de Oferta"
      name="price_promotion"
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="Colores"
      name="inventories"

    >
     <ColorPicker SetFormColors={SetFormColors}/>
    </Form.Item>

    <Form.Item
      label="Fotos"
    >
        <UploadButton/>
    </Form.Item>

    <Form.Item
        label="Category:"
        name="categoryId"
        rules={[
            {
                required: true,
                message: 'Please choose a category',
            }
        ]}
    >
        <Select>
            { allCategories.map(category => (
                <Select.Option key={ category.id } value={ category.id }>{ category.name }</Select.Option>
            )) }
        </Select>
    </Form.Item>

    <Form.Item
        label="Brand:"
        name="brandId"
        rules={[
            {
                required: true,
                message: 'Please choose a brand',
            }
        ]}
    >
        <Select>
            { allBrands.map(brand => (
                <Select.Option key={ brand.id } value={ brand.id }>{ brand.name }</Select.Option>
            )) }
        </Select>
    </Form.Item>

    <Form.Item
      label="Descripción del producto"
      name="product_description"
      rules={[
        {
          required: true,
          message: 'Por Favor brinda una descripción del producto',
        },
      ]}
    >
      <TextArea rows={4} />
    </Form.Item>

    <Form.Item
            label="Product Type:"
            name="e_product_type"
            rules={[
                {
                    required: true,
                    message: 'Please choose a product type',
                }
            ]}
        >
            <Select>
                <Select.Option value="Celular Smartphone">Celular smartphone</Select.Option>
                <Select.Option value="Celular Convencional">Celular convencional</Select.Option>
                <Select.Option value="Audifonos alambricos">Audífonos alámbricos</Select.Option>
                <Select.Option value="Audífonos bluetooth">Audífonos bluetooth</Select.Option>
                <Select.Option value="Audifonos tipo diadema">Audífonos tipo diadema</Select.Option>
                <Select.Option value="SmartWatch con bluetooth">Smartwatch con bluetooth</Select.Option>
                <Select.Option value="SmartWatch sin bluetooth">Smartwatch sin bluetooth</Select.Option>
            </Select>
        </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
)};
export default FormProductos;