import { Avatar, Button, List, Skeleton, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { CreateCart, Fill, Delete } from '../../../Redux/Features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const CartUser = () => {
    const cart=useSelector(state=>state.cart.cart)
    const dispatch= useDispatch()
    const token=window.localStorage.getItem("token")
//funciones para usar
const refresh=()=>{
    console.log(token)
    dispatch(Fill(token))
    console.log(cart)
}


const DeleteHandler=(ids)=>{
  const data=[token, ids[0], ids[1]]
  dispatch(Delete(data))
  console.log("Estoy borando loco", data)
  dispatch(CreateCart(token))
  refresh()
}



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
    cart && cart.rt_total_amount ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: "2vh",
          height: "10vh",
          lineHeight: '30px',
        }}
      >
        <Button onClick={onConsole}> {cart?`Total cart: ${cart[0].cart_total_amount}`:null} </Button>
      </div>
    ) : null;
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
      </Popconfirm>, <a key="list-loadmore-more">more</a>]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.product.photo[0]} />}
              title={<p>{item.product.name}</p>}
              description={item.product.product_description}
            />
            <div style={{display:"flex", gap:"15px"}}>

            <div>cantidad: {item.quantity_unit_product}</div>

            <div>precio unitario: {item.product.price_promotion}</div>
            </div>
          </Skeleton>
        </List.Item>
        
      )}
    />

    </div>
  );
};
export default CartUser;