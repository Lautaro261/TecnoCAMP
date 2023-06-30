import { Layout, Divider } from 'antd';
import DashboardUser from '../../../components/Client/DashboardUser/DashboardUser';
import FooterUser from '../../../components/Client/Footer/FooterUser';
import CartUser from '../../../components/Client/CartUser/CartUser';
import { useDispatch, useSelector } from 'react-redux';
import DispatchButtons from '../../../components/Client/Dispatch/DispatchButtons';


const { Header, Footer, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  paddingInline: "0px",
  // color: '#fff',
  height: 220,
  // display:"flex",
  // width: "100vw",
  lineHeight: '60px',
  width:"100vw"
  // backgroundColor: '#7dbcea',
};
const contentStyle = {
  width:"100vw",
  color: '#0000',
  minHeight:"60vh"
  
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  margin:"0px",
  padding:"0px",
  width:"100vw"
};

const CartView = () => {
  const cart=useSelector(state=>state.cart.cartFill)

return (
    

  <Layout >
    <Header style={headerStyle}><DashboardUser /></Header>
    <Content style={contentStyle}>
    <CartUser/>  
    {cart.length>0 ? <Divider>Subtotal: {cart[0].cart_total_amount}</Divider>:null}
    <DispatchButtons />  
    </Content>
    <Footer style={footerStyle}><FooterUser/></Footer>
  </Layout>


)};
export default CartView;