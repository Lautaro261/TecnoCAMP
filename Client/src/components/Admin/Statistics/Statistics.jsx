import { SearchOutlined, ShoppingCartOutlined, TeamOutlined, MobileOutlined ,PlusCircleOutlined, FastForwardOutlined, CommentOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Card, Statistic, Col, Row, Typography,Button, Input, Space, Table } from "antd";
import Highlighter from 'react-highlight-words';
import { useEffect,useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventories, getClientsNumber } from '../../../Redux/Features/admin/Statistics/adminStatistics';
import { Link } from "react-router-dom";
import { getAllOngoingOrders, getDataOrders, getOrdersByUser } from "../../../Redux/Features/admin/ongoingOrders/ongoingOrdersSlice";
import { getAllReviews } from "../../../Redux/Features/reviews/adminReviewsSlice";
import { Column } from '@ant-design/plots';

const Statistics = () => {

    const token = window.localStorage.getItem("token");
    const dispatch = useDispatch();
    const inventoriesStatistic = useSelector((state) => state.adminStatistics.inventoriesStatistic);
    const clientsStatistic = useSelector((state) => state.adminStatistics.clientsStatistic);
    const allOngoingOrders = useSelector(state => state.ongoingOrders.allOngoingOrders);
    const allReviews = useSelector(state => state.adminReviews.allReviews);
    const allDataOrders = useSelector(state => state.ongoingOrders.dataOrders)
    const allOrdersByUser = useSelector(state => state.ongoingOrders.odersByUser)

    console.log('clientes', clientsStatistic)
    console.log('inventario', inventoriesStatistic)

    useEffect(() => {
        dispatch(getInventories(token));
        dispatch(getClientsNumber(token));
        dispatch(getAllOngoingOrders(token));
        dispatch(getAllReviews(token));
        dispatch(getDataOrders(token))
        dispatch(getOrdersByUser(token))
    }, [dispatch])

   

      const [searchText, setSearchText] = useState('');
      const [searchedColumn, setSearchedColumn] = useState('');
      const searchInput = useRef(null);
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
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
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
              color: filtered ? '#1677ff' : undefined,
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
                backgroundColor: '#ffc069',
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
      const columns = [
        {
          title: 'Numero de ordenes',
          dataIndex: 'totalNumberOrders',
         
          width: '30%',
         // ...getColumnSearchProps('totalNumberOrders'),
        },
        {
          title: 'Ventas totales',
          dataIndex: 'totalSalesRevenue',
          
          width: '20%',
          //...getColumnSearchProps('totalSalesRevenue'),
        },
        {
          title: 'Prodcutos vendidos',
          dataIndex: 'totalProductsSold',
          
        //   ...getColumnSearchProps('address'),
        //   sorter: (a, b) => a.address.length - b.address.length,
        //   sortDirections: ['descend', 'ascend'],
        },
      ];

      const dataTable =  allDataOrders && allDataOrders.map((e)=>{
        return{
            totalNumberOrders: e.totalNumberOrders,
            totalSalesRevenue: e.totalSalesRevenue,
            totalProductsSold: e.totalProductsSold
        }
      })

      const data = allOrdersByUser && allOrdersByUser.map((d)=>{
        return{
          userSub: d.userSub,
          Compras: d.totalNumberProductsPurchased
        }
      })

      const config = {
        data,
        xField: 'userSub',
        yField: 'Compras',
        label: {
          // 可手动配置 label 数据标签位置
          position: 'middle',
          // 'top', 'bottom', 'middle',
          // 配置样式
          style: {
            fill: '#FFFFFF',
            opacity: 0.6,
          },
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
        meta: {
          type: {
            alias: 'totalNumberOrders',
          },
          sales: {
            alias: 'nahuel',
          },
        },
      };
    
    console.log("soy data orders",allDataOrders);
    console.log("soy data", data);
    return (
        <div>
            <Typography.Title level={3}>DashboardAdmin</Typography.Title>

            <Row justify="center" gutter={[8, 8]} style={{}}>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card>
                    <ShoppingCartOutlined style={{
                        fontSize: '36px',
                        color: 'green',
                        borderRadius: 30,
                        backgroundColor: "rgba(0,255,0,0.5)",
                        padding: 8,

                    }} />
                    <Statistic title={<Typography.Text style={{ fontSize: '18px', color: '#888888' }}>Inventario Total</Typography.Text>} value={inventoriesStatistic.totalNumberOfProducts} />

                </Card>
                </Col>

                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card>
                    <Link to='/admin/clients'>

                        <TeamOutlined style={{
                            fontSize: '36px',
                            color: 'blue',
                            borderRadius: 30,
                            backgroundColor: "rgba(5, 127, 241, 0.384)",
                            padding: 8
                        }} />
                        <Statistic title={<Typography.Text style={{ fontSize: '18px', color: '#888888' }}>Clientes</Typography.Text>} value={clientsStatistic.totalNumberOfActiveClients} />
                    </Link>
                </Card>
                </Col>

                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card>
                    <Link to='/admin/inventary'>
                        <MobileOutlined style={{
                            fontSize: '36px',
                            color: 'orange',
                            borderRadius: 30,
                            backgroundColor: "rgba(245, 155, 21, 0.377)",
                            padding: 8

                        }} />
                        <Statistic title={<Typography.Text style={{ fontSize: '18px', color: '#888888' }}>Productos totales</Typography.Text>} value={inventoriesStatistic.totalProductReferenceNumber} />
                    </Link>
                </Card>
                </Col>

                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card>
                    <Link to='/admin/createcategorybrand'>
                    <CheckCircleOutlined style={{
                            fontSize: '36px',
                            color: 'rgba(81,75,154)',
                            borderRadius: 30,
                            backgroundColor: "rgba(174, 160, 212)",
                            padding: 8

                        }}/>
                       
                        <Statistic title={<Typography.Text style={{ fontSize: '18px', color: '#888888' }} >Gestionar categorías y marcas</Typography.Text>} valueRender={() => '++'} />
                    </Link>
                </Card>
                </Col>

                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card>
                    <Link to='/admin/createproduct'>
                        <PlusCircleOutlined style={{
                            fontSize: '36px',
                            color: 'rgba(211, 0, 0)',
                            borderRadius: 30,
                            backgroundColor: "rgba(247, 18, 235, 0.377)",
                            padding: 8

                        }} />
                        <Statistic title={<Typography.Text style={{ fontSize: '18px', color: '#888888' }} >Agregar producto</Typography.Text>} valueRender={() => '+'} />
                    </Link>
                </Card>
                </Col>

                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Card>
                        <Link to='/admin/ongoing-orders'>
                            <FastForwardOutlined style={{
                                fontSize: '36px',
                                color: 'orange',
                                borderRadius: 30,
                                backgroundColor: "yellow",
                                padding: 8

                            }} />
                            <Statistic title={<Typography.Text style={{ fontSize: '18px', color: '#888888' }} >Pedidos en Curso</Typography.Text>} value={ allOngoingOrders.length } />
                        </Link>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Card>
                        <Link to='/admin/reviews'>
                            <CommentOutlined style={{
                                fontSize: '36px',
                                color: 'black',
                                borderRadius: 30,
                                backgroundColor: "gray",
                                padding: 8

                            }} />
                            <Statistic title={<Typography.Text style={{ fontSize: '18px', color: '#888888' }} >Reviews</Typography.Text>} value={ allReviews.length } />
                        </Link>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Card>
                       
                            <CommentOutlined style={{
                                fontSize: '36px',
                                color: 'red',
                                borderRadius: 30,
                                backgroundColor: "gray",
                                padding: 8
                            }} />
                            <Statistic title={<Typography.Text style={{ fontSize: '18px', color: '#888888' }} >Reviews</Typography.Text>} value={ allReviews.length } />
                        
                    </Card>
                </Col>
            </Row>
            <Row  gutter={16} >
                <Col span={12}>
                <Table columns={columns} dataSource={dataTable} />;
                </Col>
                <Col span={12}>
                <Column {...config} />;
                </Col>
            </Row>
        </div>
    )
}

export default Statistics