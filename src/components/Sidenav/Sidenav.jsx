import React from 'react'
import styled from "styled-components";
import {adminLogout} from "./api";
import {Link, useHistory} from "react-router-dom";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Bookmark from "@material-ui/icons/Bookmark"
import { Button } from '@material-ui/core';


const Menu = styled.aside`
    position:fixed;
    z-index: 10;
    top:61px;
    width: 20%;
    height: 90vh;
    gap: 40px;
    transition: all 0.3s ease;
    transform: ${({menu}) => menu ? "translateX(0)" : "translateX(-100%)"}; 
    background-color: #3f51b5;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .menu__item {
        padding:10px;
        width: 80%;
        display: flex;
        flex-direction:row;
        gap: 10px;
        align-items: center;
        text-align: center;
        background-color: white;
        border-radius: 5px;
        transition : all 0.2s ease;
    }

    .menu__item a {
        font-size: 1.1rem;
        font-weight: bolder;
        height: 100%;
        width: 90%;
    }
    .menu__item svg {
        width : 15%;
        color : #3f51b5;
    }

    .menu__item:hover {
        transform : scale(0.95); 
    }

    .menu__status {
        background-color : white;
        text-align: center;
        width: 80%;
        padding: 5px;
        border-radius: 7px;
    }

    .menu__status strong {
        color : green;
    }

`;


const Sidenav = ({setRender,setMenu,menu}) => {

    const history = useHistory();
    const token = localStorage.getItem("token");
    const handleLogout = async () => {
        const response = await adminLogout(token);
        if(response.message)
        {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            setRender(prevState => {
                return !prevState;
            });
            history.push('/');
        }
    }

    const handleLinkClick = () => {
        setMenu(false);
    }

    return ( 
        <Menu menu={menu}>

           <p className="menu__status">Status : <strong>Active</strong></p>
            <div className="menu__item">
                <AccountBoxIcon className="menu__profile" />
                <Link to="/profile" onClick={handleLinkClick}>My Profile</Link>
            </div>

            <div className="menu__item">
                <SupervisedUserCircleIcon />
                <Link to="/admins" onClick={handleLinkClick}>Admins</Link>
            </div>
            <div className="menu__item">
                <AllInboxIcon />
                <Link to="/posts" onClick={handleLinkClick}>My Posts</Link>
            </div>
            <div className="menu__item">
                <LocalHospitalIcon />
                <Link to="/tests" onClick={handleLinkClick}>Tests</Link>
            </div>
            <div className="menu__item">
                <Bookmark />
                <Link to="/bookings" onClick={handleLinkClick}>Bookings</Link>
            </div>
            <Button variant="contained" disableElevation onClick={handleLogout}>
                Logout
            </Button>
        </Menu>
     );
}
 
export default Sidenav;