import React from "react";
import { Link } from "react-router-dom";
import {Tooltip, Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Fill } from "../../../../Redux/Features/profile/profileSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



const IconAdminProfile = () => {
    const dispatch=useDispatch();
    const profile=useSelector(state=>state.profile.profiledat)
    const token=window.localStorage.getItem("token")
    useEffect(()=>{
        dispatch(Fill(token))
    },[])
    return (
        <Link to='/admin/profile'>
                
            <Tooltip title='Ir a perfil'>
            <Avatar shape="circle" size={115} icon={<UserOutlined />} src={profile.photo}/>
            <div style={{color:"white"}}>{profile.name?profile.name:null}</div>
            <div style={{color:"gray"}}>{profile.mail}</div>
            </Tooltip>
        </Link>
    )
}
export default IconAdminProfile;