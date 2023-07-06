import { useDispatch, useSelector } from "react-redux";
import { Layout, Space, Divider } from "antd";
import { useEffect } from "react";
import { getAllAdmins } from "../../../Redux/Features/SuperAdmin/createAdmin/createAdminSlice";
import DashBoardSuperAdmin from "../../../components/SuperAdmin/DashBoardSuperAdmin/DashBoardSuperAdmin";
import AdminTable from "../../../components/SuperAdmin/DashBoardSuperAdmin/AdminTable/AdminTable";
import CreateAdminComponent from "../../../components/SuperAdmin/CreateAdminComponent/createAdminComponent";

const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  textAlign: "center",
  height: 62,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#56E0DA",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#0000",
  backgroundColor: "#f7f7f7",
};
const siderStyle = {
  width: "300px",
  textAlign: "center",
  lineHeight: "40px",
  color: "#fff",
  backgroundColor: "#1d1d1d",
  minHeight: "100vh", // Cambiado a `minHeight` en lugar de `height`
  display: "flex", // Utilizando flexbox para adaptar la altura automáticamente
  flexDirection: "column", // Alinear los elementos verticalmente
};

const ViewAdmin = () => {
  const token = window.localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAdmins({ token }));
  }, []);

  return (
    <div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size={[0, 48]}
      >
        <Layout>
          <Sider style={siderStyle}>
            <DashBoardSuperAdmin />
          </Sider>
          <Layout>
              <Header style={headerStyle}>
                <Divider style={{ color: "black" }}>Administradores de la Tienda</Divider>
              </Header>
            <Content style={contentStyle}>
              <CreateAdminComponent />
              <AdminTable />
            </Content>
          </Layout>
        </Layout>
      </Space>
    </div>
  );
};

export default ViewAdmin;
