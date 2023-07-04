import { useDispatch, useSelector } from "react-redux";
import { Layout, Space, Divider } from "antd";
import { useEffect } from "react";
import { getAllAdmins } from "../../../Redux/Features/SuperAdmin/createAdmin/createAdminSlice";
import DashBoardSuperAdmin from "../../../components/superAdmin/DashBoardSuperAdmin/DashBoardSuperAdmin";
import AdminTable from "../../../components/SuperAdmin/DashBoardSuperAdmin/AdminTable/AdminTable";
import CreateAdminComponent from "../../../components/SuperAdmin/CreateAdminComponent/createAdminComponent";

const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  // width:'100vh',
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#0000",
  backgroundColor: "#ffff",
};
const siderStyle = {
  width: "300px",
  textAlign: "center",
  lineHeight: "40px",
  color: "#fff",
  backgroundColor: "#001529",
  height: "100vh",
};

const ViewAdmins = () => {
  const token = window.localStorage.getItem("token");
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.superAdminAdmins.allAdmins);
  useEffect(() => {
    dispatch(getAllAdmins({ token }));
    console.log("**");
    console.log(admins);
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
              <Divider style={{ color: "black" }}>Admins</Divider>
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

export default ViewAdmins;
