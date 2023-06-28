import { Button, Form, Input, Select, Row, Col } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadButton from '../../Client/Cloudinary/UploadButton';
import ColorPicker from '../ColorPicker/ColorPicker.jsx';
import { getAllCategories } from '../../../Redux/Features/admin/categories/adminCategoriesSlice';
import { getAllBrands } from '../../../Redux/Features/admin/brands/adminBrandsSlice';
import { resetPhotos } from '../../../Redux/Features/photos/photosSlice';
const { TextArea } = Input;


const FormProductos = () => {
  const dispatch = useDispatch();
  const photos = useSelector(state => state.photos.photos);
  const allCategories = useSelector(state => state.adminCategories.allCategories);
  const allBrands = useSelector(state => state.adminBrands.allBrands);
  const token = localStorage.getItem('token');
  const [FormColors, SetFormColors] = useState([])
  const [cantidad, setCantidad] = useState([])
  const [color, setcolor] = useState([])


  useEffect(() => {
    dispatch(resetPhotos([]));
    dispatch(getAllCategories(token));
    dispatch(getAllBrands(token));
  }, []);

  const post = async (values) => {
    const coloresA = FormColors.map(e => { return (e[0]) })
    const cantidadesA = FormColors.map(e => { return (e[1]) })
    const data = { ...values, photo: photos, colors: coloresA, quantities: cantidadesA }
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


  return (
    <div style={{  maxWidth: '100%', marginTop:'10vh' }}>

      <Form
        name="basic"
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: '100%'
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Nombre del producto:"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'porfavor introduce el nombre del artículo',
                },
                {
                  pattern: /^[a-zA-Z0-9]+$/,
                  message: 'Solo se permiten letras y números',
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Precio unitario:"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Por favor colocar un precio',
                },
                {
                  pattern: /^[0-9]+$/,
                  message: 'Solo puedes ingresar números',
                }
              ]}
            >
              <Input type='number'/>
            </Form.Item>

            <Form.Item
              label="Precio de oferta:"
              name="price_promotion"
            >
              <Input type='number'/>
            </Form.Item>

            <Form.Item
              label="Colores:"
              name="inventories"
            >
              <ColorPicker SetFormColors={SetFormColors} />
            </Form.Item>

            <Form.Item
              label="Fotos:"
            >
              <UploadButton />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>

            <Form.Item
              label="Categoría:"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: 'Por favor elija una categoría',
                }
              ]}
            >
              <Select>
                {allCategories.map(category => (
                  <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Marca:"
              name="brandId"
              rules={[
                {
                  required: true,
                  message: 'Por favor elija una marca',
                }
              ]}
            >
              <Select>
                {allBrands.map(brand => (
                  <Select.Option key={brand.id} value={brand.id}>{brand.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Descripción del producto:"
              name="product_description"
              rules={[
                {
                  required: true,
                  message: 'Por favor brinda una descripción del producto',
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Tipo de producto:"
              name="e_product_type"
              rules={[
                {
                  required: true,
                  message: 'Por favor elija el tipo de producto',
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

          </Col>
        </Row>
        <Row >
          <Col span={24} style={{ textAlign: 'center' }}>
            <Form.Item
              wrapperCol={{
                // offset: 12,
                span: 24,
              }}
            >
              <Button type='primary' htmlType="submit">
                Cargar producto
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
};
export default FormProductos;