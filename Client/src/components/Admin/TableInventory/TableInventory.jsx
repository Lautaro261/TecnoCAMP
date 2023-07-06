import { useSelector, useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  InputNumber,
  Space,
  Table,
  Switch,
  Col,
  Tag,
  Popconfirm,
  Drawer,
  Form,
  Row,
  Select,
  Typography
} from "antd";
import { notification } from 'antd';
import { useRef, useState, useEffect } from "react";

import Highlighter from "react-highlight-words";
import { getAllProducts } from "../../../Redux/Features/admin/products/adminProductsSlice";
import { getAllCategories } from "../../../Redux/Features/admin/categories/adminCategoriesSlice";
import { getAllBrands } from "../../../Redux/Features/admin/brands/adminBrandsSlice";
import { banProduct, EditProduct } from "../../../Redux/Features/admin/products/adminProductsSlice";

import ColorPicker from "../ColorPicker/ColorPicker";

import PseudoColorPicker from "../PseudoColorPicker/PseudoColorPicker"
const { Title } = Typography;

function TableInventory() {
  const [form] = useForm();
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const allProducts = useSelector((state) => state.adminProducts.allProducts);
  const allCategories = useSelector(
    (state) => state.adminCategories.allCategories
  );
  const allBrands = useSelector((state) => state.adminBrands.allBrands);


  useEffect(() => {
    dispatch(getAllProducts(token));
    dispatch(getAllCategories(token));
    dispatch(getAllBrands(token));
  }, [dispatch]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const renderDisponibleTags = (_, record) => (
    record.aviable === 'Disponible' ?
      <Tag color='blue' key={record.aviable}>
        {record.aviable}
      </Tag> :
      <Tag color='volcano' key={record.aviable}>
        {record.aviable}
      </Tag>
  );

  const columns = [
    {
      title: "Foto",
      dataIndex: "photo",
      render: (photo) => (
        <>
          {" "}
          <img
            style={{ maxHeight: "10vh", width: "5vw", borderRadius: "10%" }}
            src={photo}
          />{" "}
        </>
      ),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "key",
      width: "30%",
      ...getColumnSearchProps("name"),
      sorter: (c, d) => c.name.length - d.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Existencia",
      dataIndex: "total_quantity_inventory",
      key: "key",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "key",
    },
    {
      title: "Categoria",
      dataIndex: "category",
      key: "key",
      width: "20%",
    },
    {
      title: "Disponible",
      dataIndex: "aviable",
      key: 'key',
      render: renderDisponibleTags,

    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "key",
      ...getColumnSearchProps("brand"),
      sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => showDrawer(record.key)}>
            Editar
          </Button>

          <button type="primary" id={record.key} onClick={handleDelete}>eliminar</button>
        </>
      )
    },
  ];

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColorsDefaut, setselectedColorsDefaut] = useState(null);
  const [DefinitiveColors, setDefinitiveColors] = useState(null)

  const data =
    allProducts &&
    allProducts.map((c) => {
      return {
        key: c.id,
        price: c.price,
        photo: c.photo ? c.photo[0] : 'no hay foto',
        name: c.name,
        total_quantity_inventory: c.total_quantity_inventory,
        category: c.category.name,
        brand: c.brand.name,
        aviable: c.is_available ? "Disponible" : "No disponible",
        e_product_type: c.e_product_type,
        inventories: c.inventories

      };
    });



  const [open, setOpen] = useState(false);
  const showDrawer = (productId) => {
    const product = allProducts.find((p) => p.id === productId);
    setSelectedProduct(product);
    setSelectedProductId(productId);

    var toc = []
    for (var i = 0; i < product.inventories.length; i = i + 1) {
      console.log("ciclo for", product.inventories[i].color)
      toc.push([product.inventories[i].color, product.inventories[i].quantity_inventory])
    }
    setselectedColorsDefaut(toc)
    setDefinitiveColors(toc)

    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    location.reload();
  };

  const onFinish = (values) => {
    //  const inventoryItems=DefinitiveColors.map((color)=>{
    //    return({color:color[0], quantity:color[1]})
    const ids = selectedProduct.inventories.map((item) => { return (item.id) })
    const inventoryItems = DefinitiveColors.map((color, index) => {
      return ({ color: color[0], quantity: color[1], id: ids[index], is_available: true })
    })
    const valueEdit = {
      ...values,
      inventoryItems,
    };

    enviar([token, selectedProductId, valueEdit])
    location.reload();
  };

  const enviar = (data) => {
    dispatch(EditProduct(data))
    console.log("enviando")
    console.log(data)
  }

  const handleDelete = (e) => {
    console.log(e.target.id)
    dispatch(banProduct([token, e.target.id]))
    location.reload();

  };




  return (
    <>
      <Row>
        <Col span={24}> <Title level={3}>Inventario de productos.</Title></Col>
      </Row>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: "4vh" }}
      />

      <Drawer
        title="Editar producto"
        width={720}
        onClose={onClose}
        open={open}
        onFinish={onFinish}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={() => form.submit()} type="primary">
              Enviar
            </Button>
          </Space>

        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          onFinish={onFinish}
          initialValues={selectedProduct}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Nombre"
                rules={[
                  {
                    required: true,
                    message: "Ingrese un nombre nuevo",
                  },
                ]}
              >
                <Input value={name} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="price"
                label="Precio"
                rules={[
                  {
                    required: false,
                    message: "Por favor ingrese el precio",
                  },
                ]}
              >
                <InputNumber min={1} max={100000000000000000} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="categoryId"
                label="Categoría"
                rules={[
                  {
                    required: false,
                    message: "Please select an owner",
                  },
                ]}
              >
                <Select>
                  {allCategories &&
                    allCategories.map((category) => (
                      <Select.Option key={category.id} value={category.id}>
                        {category.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="brandId"
                label="Marca"
                rules={[
                  {
                    required: false,
                    message: "Please choose the type",
                  },
                ]}
              >
                <Select placeholder="Please choose the type">
                  {allBrands &&
                    allBrands.map((brand) => (
                      <Select.Option key={brand.id} value={brand.id}>
                        {brand.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="e_product_type"
                label="Tipo de producto"
                rules={[
                  {
                    required: false,
                    message: "Please select an owner",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="Celular Smartphone">
                    Celular smartphone
                  </Select.Option>
                  <Select.Option value="Celular Convencional">
                    Celular convencional
                  </Select.Option>
                  <Select.Option value="Audifonos alambricos">
                    Audífonos alámbricos
                  </Select.Option>
                  <Select.Option value="Audífonos bluetooth">
                    Audífonos bluetooth
                  </Select.Option>
                  <Select.Option value="Audifonos tipo diadema">
                    Audífonos tipo diadema
                  </Select.Option>
                  <Select.Option value="SmartWatch con bluetooth">
                    Smartwatch con bluetooth
                  </Select.Option>
                  <Select.Option value="SmartWatch sin bluetooth">
                    Smartwatch sin bluetooth
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col>
              <Form.Item

                rules={[
                  {
                    required: false,
                    message: "Please select an owner",
                  },
                ]}>
                <Col>
                  Colores Disponibles:
                  <PseudoColorPicker formColors={selectedColorsDefaut} SetFormColors={setDefinitiveColors} />
                </Col>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="product_description"
                label="Description"
                rules={[
                  {
                    required: false,
                    message: "Por favor ingrese una descripcion",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Ingrese su descripción aquí"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}

export default TableInventory;
