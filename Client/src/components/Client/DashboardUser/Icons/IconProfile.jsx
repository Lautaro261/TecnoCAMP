import React, { useEffect } from "react";
import { Tooltip, Avatar } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch,useSelector } from "react-redux";
import { Fill } from "../../../../Redux/Features/profile/profileSlice";
//cami cami cami

const IconProfile = () => {
  const profile = useSelector(state=>state.profile.profiledat)
  const dispatch = useDispatch()
  const token = window.localStorage.getItem('token')

 useEffect(()=>{
  dispatch(Fill(token))
 },[])


  return (
    <Link to="/profile">
      <Tooltip title='Ir a perfil'>
        <Avatar shape='square' size={40} icon={<UserOutlined/>} src={profile.photo} style={{ marginTop: 0 ,  verticalAlign: 'top'}}/>
      </Tooltip>
    </Link>
  )
}

export default IconProfile;