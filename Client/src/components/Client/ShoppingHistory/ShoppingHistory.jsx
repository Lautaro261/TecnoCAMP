import { useEffect } from "react";
import { Fill } from "../../../Redux/Features/history/historySlice";
import { useDispatch, useSelector } from "react-redux";
import { Card, Divider, Row, Col, Button, Steps } from 'antd';
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal';

const ShoppingHistory=()=>{
    const dispatch=useDispatch()
    const token=window.localStorage.getItem("token")
    const history=useSelector(state=>state.history.historyFill)
 

      const statusSteps = [
        'En preparacion',
        'Despachado',
        'Entregado'
      ];
      

    useEffect(()=>{
        if(token){
        dispatch(Fill(token))}
        console.log(history)
    }, [])


    
    return(
        <div>
            <div>
            <h1 style={{color:"Black", marginLeft:"40vw"}}>Historial de compras</h1>
            </div>
            {history.length>=1? 
            
            <div style={{marginLeft:"20vw"}}>
                {history.map((order)=>{
                    console.log("SOY STATUS",order.order.shipping_status)
                    return(
                    <div key={ order.order.id }>
                    <Card
                    title={`Fecha: ${order.order.payment_date.split("T")[0]}   Hora: ${order.order.payment_date.split("T")[1].split(":")[0]}:${order.order.payment_date.split("T")[1].split(":")[1]} `}
                    extra={<Steps
                        current={statusSteps.indexOf(order.order.shipping_status) + 1}
                        items={statusSteps.map((status, index) => ({
                          title: status,
                        }))}
                      />}
                    style={{
                      width:"60vw",
                    }}
                  >
                    {order.products.map((item)=>{
                        return(
                            <div key={item.id}>
                            <Row justify='center' align='middle'>
                                <Col span={6}><img src={item.photo} style={{maxHeight:"10vh"}} /></Col>
                                <Col span={6}><p>{item.name}</p></Col>
                                <Col span={6}><p>Precio: ${item.price}</p></Col>
                                {/* <Col id={item.id} onClick={valorate} span={2}><button disabled={false}id={item.id}  style={{background: "white",fontFamily: "inherit",padding: "0.6em 1.3em",fontWeight: "20",fontSize: "15px",border:"1px solid black",borderRadius: "0.4em",}} onClick={valorate}>Puntuar</button></Col> */}
                                <Col>
                                    { order.order.shipping_status === 'Entregado' ? <ReviewFormModal productId={ item.id } orderId={ order.order.id } /> : <Button disabled>Dejar Review</Button>  }
                                </Col>

                            </Row>
                            
                            <Row>
                                <p>Colores Comprados: </p>
                                {item.inventoryIds.map((color)=>{
                                return(<p key={ color.id } style={{backgroundColor:`${color.color}`, width:"20px", height:"20px", borderRadius:"20%", paddingLeft:"0.5%"}}>{color.quantity_unit_product}</p>)})}
                            </Row>
                            
                            
                            <Divider/>
                            </div>
                        )
                    })}
                    <div>Total Pagado: ${order.order.total_amount_all_products}</div>
                    <div>Numero de orden: {order.order.id}</div>

                  </Card>
                <Divider style={{marginLeft:"-10vw"}}/>
                </div>
                  )


                })}

            </div>
            :
            <div style={{color:"grey", marginLeft:"40vw", marginTop:"10vh"}}> Aún no hay compras que mostrar</div>
            }
        </div>
    )}

export default ShoppingHistory;