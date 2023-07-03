import { ShoppingCartOutlined, TeamOutlined, MobileOutlined ,PlusCircleOutlined, FastForwardOutlined, CommentOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Card, Statistic, Col, Row, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventories, getClientsNumber } from '../../../Redux/Features/admin/Statistics/adminStatistics';
import { Link } from "react-router-dom";
import { getAllOngoingOrders } from "../../../Redux/Features/admin/ongoingOrders/ongoingOrdersSlice";
import { getAllReviews } from "../../../Redux/Features/reviews/adminReviewsSlice";

const Statistics = () => {

    const token = window.localStorage.getItem("token");
    const dispatch = useDispatch();
    const inventoriesStatistic = useSelector((state) => state.adminStatistics.inventoriesStatistic);
    const clientsStatistic = useSelector((state) => state.adminStatistics.clientsStatistic);
    const allOngoingOrders = useSelector(state => state.ongoingOrders.allOngoingOrders);
    const allReviews = useSelector(state => state.adminReviews.allReviews);

    console.log('clientes', clientsStatistic)
    console.log('inventario', inventoriesStatistic)

    useEffect(() => {
        dispatch(getInventories(token));
        dispatch(getClientsNumber(token));
        dispatch(getAllOngoingOrders(token));
        dispatch(getAllReviews(token));
    }, [dispatch])

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
            </Row>
        </div>
    )
}

export default Statistics