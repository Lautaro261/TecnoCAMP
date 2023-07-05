import React, { useEffect } from "react";
import { Tooltip, Avatar } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch,useSelector } from "react-redux";
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
        <Avatar shape='circle' size={50} icon={<UserOutlined/>} src={profile.photo}/>
      </Tooltip>
    </Link>
  )
}

export default IconProfile;