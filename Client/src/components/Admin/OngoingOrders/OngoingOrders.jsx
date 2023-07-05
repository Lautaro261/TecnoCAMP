import { Row, Col, Button, Input, Space, Table, Divider, Typography, Tag} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OngoingOrdersDrawer from '../OngoingOrdersDrawer/OngoingOrdersDrawer';
import OngoingOrdersDetails from '../OngoingOrdersDetails/OngoingOrdersDetails';
import { getAllOngoingOrders } from '../../../Redux/Features/admin/ongoingOrders/ongoingOrdersSlice'; 

const {Title} = Typography

const AdminReviews = () => {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const allOngoingOrders = useSelector(state => state.ongoingOrders.allOngoingOrders);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    useEffect(() => {
        dispatch(getAllOngoingOrders(token));
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys, 
            selectedKeys, 
            confirm, 
            clearFilters, 
            close 
        }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation() }>
                <Input
                    ref={ searchInput } 
                    placeholder={ `Search ${ dataIndex }`} 
                    value={ selectedKeys[0] } 
                    onChange={ (e) => setSelectedKeys(e.target.value ? [e.target.value] : []) }
                    onPressEnter={ () => handleSearch(selectedKeys, confirm, dataIndex) }
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type='primary' 
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex) } 
                        icon={ <SearchOutlined /> }
                        size='small'
                        style={{ inlineSize: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={ () => clearFilters && handleReset(clearFilters) }
                        size='small' 
                        style={{ inlineSize: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type='link' 
                        size='small' 
                        onClick={ () => {
                            confirm({
                                closeDropdown: false
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        } }
                    >
                        Filter
                    </Button>
                    <Button
                        type='link' 
                        size='small' 
                        onClick={ () => {
                            close();
                        } }
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? '#1677ff' : undefined }}
            />
        ),
        onFilter: (value, record) => 
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()), 
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle = {{ padding: 0, backgroundColor: '#ffc069' }} 
                searchWords = { [searchText] }
                autoEscape 
                textToHighlight={ text ? text.toString() : '' }
            />
        ) : (text)
    });

    const data = allOngoingOrders.length > 0 ? allOngoingOrders.map(order => {
        return {
            key: order.order.id, 
            transaction_id: order.order.payment_transaction_id, 
            contact_name: order.order.contact_name, 
            date_time: order.order.payment_date, 
            shipping_status: order.order.shipping_status, 
            contact_cellphone: order.order.contact_cellphone, 
            total_quantity_all_products: order.order.total_quantity_all_products, 
            total_amount_all_products: order.order.total_amount_all_products, 
            department: order.order.department.name, 
            municipality: order.order.municipality.name, 
            address: order.order.address, 
            neighborhood: order.order.neighborhood, 
            products: order.products
        };
    }) : 0

    const columns = [
        {
            key: 'key', 
            title: 'ID de Transacción', 
            dataIndex: 'transaction_id'
        }, 
        {
            key: 'key', 
            title: 'Cliente', 
            dataIndex: 'contact_name', 
            sorter: (a, b) => a.contact_name.localeCompare(b.contact_name), 
            ...getColumnSearchProps('contact_name')
        }, 
        {
            key: 'key', 
            title: 'Fecha y Hora', 
            dataIndex: 'date_time', 
            render: (date_time) => {
                const date = new Date(date_time);
                const formattedDate = date.toISOString().slice(0, 10);
                const formattedTime = date.toTimeString().slice(0, 8);
                return (
                    <div>
                        <div><span style={{ fontWeight: 620 }}>Fecha:</span> { formattedDate }</div>
                        <div><span style={{ fontWeight: 620 }}>Hora:</span> { formattedTime }</div>
                    </div>
                );
            }, 
            sorter: (a, b) => new Date(a.date_time) - new Date(b.date_time)
        }, 
        {
            key: 'key', 
            title: 'Producto y Cantidad',
            dataIndex: 'products',
            render: (products) => {
                return (
                    <div>
                        { products.map(product => (
                            product.inventoryIds.map(inventory => (
                                <div key={ inventory.id } style={{ marginBlock: '15px' }}>
                                    <div><span style={{ fontWeight: 620 }}>{product.name}</span></div>
                                    <Row align='middle'><span style={{ fontWeight: 620 }}></span><img src={ product.photo[0] } alt={ product.name } style={{ inlineSize: '100px' }} /></Row>
                                    <Row>
                                            <Col>
                                                <span style={{ fontWeight: 620 }}>Color:</span> 
                                            </Col>
                                            <Col>
                                                <Row style={{ blockSize: '20px', inlineSize: '20px', marginInlineStart: '5px', borderRadius: '50%', backgroundColor: inventory.color }}></Row>
                                            </Col>
                                        </Row>
                                    <div><span style={{ fontWeight: 620 }}>Cantidad:</span> { inventory.quantity_unit_product }</div>
                                    <Divider style={{ margin: 0 }} />
                                </div>
                            ))
                        )) }
                    </div>
                );
            }
        }, 
        {
            key: 'key',
            title: 'Estado de Envío',
            dataIndex: 'shipping_status',
            filters: [
              { text: 'En preparación', value: 'En preparacion' },
              { text: 'Despachado', value: 'Despachado' },
              { text: 'Entregado', value: 'Entregado' }
            ],
            onFilter: (value, record) => record.shipping_status === value,
            render: (shipping_status) => {
              let color = '';
              if (shipping_status === 'En preparacion') {
                color = 'geekblue';
              } else if (shipping_status === 'Despachado') {
                color = 'green';
              } else if (shipping_status === 'Entregado') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={shipping_status} style={{ fontSize: '17px' }}>
                  {shipping_status}
                </Tag>
              );
            }
          },
        {
            key: 'key', 
            title: 'Acciones', 
            dataIndex: 'action', 
            render: (_, index) => (
                <OngoingOrdersDrawer 
                    orderId={ index.key }
                    contact_name={ index.contact_name } 
                    contact_cellphone={ index.contact_cellphone } 
                    address={ index.address } 
                    neighborhood={ index.neighborhood } 
                />
            )
        }, 
        {
            key: 'key', 
            title: 'Detalles', 
            dataIndex: 'details', 
            render: (_, index) => (
                <OngoingOrdersDetails 
                    orderId = { index.key } 
                    transaction_id={ index.transaction_id }
                    date_time = { index.date_time }
                    contact_name={ index.contact_name } 
                    contact_cellphone={ index.contact_cellphone } 
                    total_quantity_all_products={ index.total_quantity_all_products } 
                    total_amount_all_products={ index.total_amount_all_products }
                    department={ index.department }
                    municipality={ index.municipality } 
                    address={ index.address } 
                    neighborhood={ index.neighborhood } 
                    products={ index.products }
                />
            )
        }
    ];

    return (
        <>
       <Title level={3}>Pedidos en curso.</Title>

        <Table 
            dataSource={ data } 
            columns={ columns } 
            pagination={{ pageSize: 4 }}
            style={{ marginTop: '4vh'}} 
        />
        </>
    );
};

export default AdminReviews;