import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
const IconFavorite = () => {
    return (
        <Link to="/myfavourites">
            <Tooltip title='Ir a favoritos'>
            <div name="favorites">
                <svg
                    width="30"
                    height="40"
                    viewBox="0 0 47 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        value="hola"
                        name="chau"
                        d="M23.1756 39.2287C22.874 39.2305 22.575 39.1727 22.2958 39.0586C22.0166 38.9446 21.7626 38.7766 21.5485 38.5642L3.74226 20.735C1.50871 18.4781 0.255859 15.4311 0.255859 12.2558C0.255859 9.08056 1.50871 6.03354 3.74226 3.77665C5.99327 1.53199 9.04249 0.271484 12.2214 0.271484C15.4004 0.271484 18.4496 1.53199 20.7006 3.77665L23.1756 6.25165L25.6506 3.77665C27.9016 1.53199 30.9508 0.271484 34.1298 0.271484C37.3087 0.271484 40.3579 1.53199 42.6089 3.77665C44.8425 6.03354 46.0953 9.08056 46.0953 12.2558C46.0953 15.4311 44.8425 18.4781 42.6089 20.735L24.8027 38.5642C24.5885 38.7766 24.3346 38.9446 24.0554 39.0586C23.7762 39.1727 23.4772 39.2305 23.1756 39.2287Z"
                        fill="#50C6E0"
                    />
                </svg>
            </div>
        </Tooltip>
        </Link>
    )
}

export default IconFavorite;