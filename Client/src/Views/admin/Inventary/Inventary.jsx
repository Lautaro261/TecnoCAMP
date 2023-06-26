import TableInventory from '../../../components/Admin/TableInventory/TableInventory';
import DashboardAdmin from '../../../components/Admin/DashboardUser/DashboardAdmin'
import { Layout, Space, Divider, Row, Col } from 'antd';


const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};
const siderStyle = {
  width:'300px',
  textAlign: 'center',
  lineHeight: '40px',
  color: '#fff',
  backgroundColor: '#001529',
  height:"100vh",
  position:'fixed',
  bottom:0,
  left:0
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#0000',
  backgroundColor: '#ffff',
  marginLeft: '14vw'
};

// const headerStyle = {
//   textAlign: 'center',
//   color: '#fff',
//   height: 64,
//   paddingInline: 50,
//   lineHeight: '64px',
//   backgroundColor: '#7dbcea',
//   marginLeft: '19vw'

// };
// const contentStyle = {
//   textAlign: 'center',
//   minHeight: 120,
//   lineHeight: '120px',
//   color: '#0000',
//   backgroundColor: '#ffff',
//   height:"100%",
//   marginLeft: '19vw'
// };
// // const siderStyle = {
// //   left:0,
// //   bottom: 0,
// //   position:'fixed',
// //   // width:'300px',
// //   textAlign: 'center',
// //   lineHeight: '40px',
// //   color: '#fff',
// //   backgroundColor: '#001529',
// //   height:"100vh",
 
// };


function Inventary() {
  return (
    <div>
    <Space
direction="vertical"
style={{
width: '100%',
}}
size={[0, 48]}
>
<Layout>
<Sider style={siderStyle}><DashboardAdmin/></Sider>
<Layout>
<Header style={headerStyle}><Divider style={{color:"black",}}>Inventario </Divider></Header>
<Content style={contentStyle}>
    
    <TableInventory/>

</Content>
</Layout>
</Layout>
</Space>
</div>
  )
}

export default Inventary