import { ShopOutlined, ShoppingCartOutlined, TeamOutlined, MobileOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Card, Statistic, Col, Row, Typography, Space } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventories, getClientsNumber } from '../../../Redux/Features/admin/Statistics/adminStatistics';
import { Link } from "react-router-dom";

const  Statistics = () => {

    const token = window.localStorage.getItem("token");
    const dispatch = useDispatch();
    const inventoriesStatistic = useSelector((state)=> state.adminStatistics.inventoriesStatistic)
    const clientsStatistic = useSelector((state)=> state.adminStatistics.clientsStatistic)

    console.log('clientes',clientsStatistic)
    console.log('inventario',inventoriesStatistic)

    useEffect(()=>{
        dispatch(getInventories(token))
        dispatch(getClientsNumber(token))
    },[dispatch])
    
  return (
    <div>
        <Typography.Title level={3}>DashboardAdmin</Typography.Title>
        <Space>
            <Card>
                <ShoppingCartOutlined style={{ 
                    fontSize: '36px',
                    color:'green',
                    borderRadius: 30,
                    backgroundColor: "rgba(0,255,0,0.5)",
                    padding:8,

                    }}/>
                <Statistic title={<Typography.Text style={{ fontSize: '18px', color: '#888888' }}>Inventario Total</Typography.Text>} value={inventoriesStatistic.totalNumberOfProducts} />
                
            </Card>


            <Card>
                <Link to='/admin/clients'>

            <TeamOutlined style={{    
                fontSize: '36px',
                color:'blue',
                borderRadius: 30,
                backgroundColor: "rgba(5, 127, 241, 0.384)",
                padding:8
            }} />
                <Statistic title={<Typography.Text style={{ fontSize: '18px', color: '#888888' }}>Inventario Total</Typography.Text>} value={clientsStatistic.totalNumberOfActiveClients}/>
            </Link>
            </Card>


            <Card>
            <Link to='/admin/inventary'>
              <MobileOutlined style={{    
                fontSize: '36px',
                color:'orange',
                borderRadius: 30,
                backgroundColor: "rgba(245, 155, 21, 0.377)",
                padding:8
                
                }}/>
                <Statistic title={<Typography.Text style={{ fontSize: '18px', color: '#888888' }}>Inventario Total</Typography.Text>} value={inventoriesStatistic.totalProductReferenceNumber}/>
                </Link>
            </Card>

            <Card>
            <Link to='/admin/createproduct'>
              <PlusCircleOutlined style={{    
                fontSize: '36px',
                color:'rgba(211, 0, 0)',
                borderRadius: 30,
                backgroundColor: "rgba(247, 18, 235, 0.377)",
                padding:8
                
                }}/>
                <Statistic title={<Typography.Text style={{ fontSize: '18px', color: '#888888' }} >Agregar</Typography.Text>} valueRender={() => null}/>
                </Link>
            </Card>

        </Space>
    </div>
  )
}

export default Statistics