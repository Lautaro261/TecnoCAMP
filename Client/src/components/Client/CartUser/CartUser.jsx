import { Avatar, Button, List, Skeleton, Popconfirm, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { CreateCart, Fill, Delete } from '../../../Redux/Features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCartForAUser } from '../../../Redux/Features/payment/paymentSlice';

const CartUser = () => {
    const cart=useSelector(state=>state.cart.cartFill)
    const dispatch= useDispatch()
    const token=window.localStorage.getItem("token")
//funciones para usar
const refresh=()=>{
    dispatch(Fill(token))
}


const DeleteHandler=(ids)=>{
  const data=[token, ids[0], ids[1]]
  dispatch(Delete(data))
  console.log("Estoy borando loco", data)
  dispatch(CreateCart(token))
  refresh()
}

const DeleteAll=async ()=>{
  await cart.map((item)=>{DeleteHandler([item.productId,item.inventoryId])})
  console.log("okay")
}


useEffect(() => {
  if (token) {
    dispatch(getCartForAUser(token));
  }
}, []);

// creacion
useEffect(()=>{
    if (token){
        dispatch(CreateCart(token))
        refresh()
    }

},[token])




//cosas de la tabla
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
        if(!cart){
        setInitLoading(false);
        };}, []);

  const onConsole = () => {
    console.log(cart)
   };

   // boton para consologear
  const loadMore =
  cart.length>=1?(
      <div
        style={{
          textAlign: 'center',
          marginTop: "2vh",
          height: "10vh",
          lineHeight: '30px',
        }}
      >
        <Button onClick={DeleteAll}> vaciar todo el carrito </Button>
      </div>): null
    ;
  return (
    <div>
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={cart}
      style={{width:"50vw", marginLeft:"25vw"}}
      renderItem={(item) => (
        <List.Item
          actions={[<Popconfirm title="¿eliminar?" onConfirm={() => DeleteHandler([item.productId,item.inventoryId])}>
          <Button type="primary">Eliminar</Button>
      </Popconfirm>/* ,           <InputNumber min={1} max={10} value={1}/> */]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.product.photo[0]} />}
              title={<p>{item.product.name}</p>}
              description={item.product.product_description}
            />
            <div style={{display:"flex", gap:"15px"}}>

            <div>cantidad: {item.quantity_unit_product}</div>

            <div>precio unitario: {item.product.price}</div>
            </div>
          </Skeleton>
        </List.Item>
        
      )}
    />

    </div>
  );
};
export default CartUser;