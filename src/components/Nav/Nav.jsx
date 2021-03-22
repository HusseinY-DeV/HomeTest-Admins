import React from 'react'
import styled from "styled-components";
import MenuIcon from '@material-ui/icons/Menu';

const Navbar = styled.nav`
    height: 10vh;
    width: 100%;
    position:fixed;
    top:0px;
    background-color: #3f51b5;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 15px;
    z-index: 20;

    .navbar__logo {
        color : whitesmoke;
        font-size:20px;
        cursor: none;
    }

    .navbar__menu {
        cursor: pointer;
        transform : ${({menu}) => menu ? "rotate(-180deg) scale(1.5)" : "rotate(180deg) scale(1)"};
        transition: all 0.3s ease;
        color : white;
    }
`;

const Nav = ({menu,setMenu,page}) => {

    const handleMenuClick = () => {
        setMenu(!menu);
    }

    return ( 
        <Navbar menu={menu}>
            <MenuIcon className="navbar__menu" 
            onClick={handleMenuClick}
            />
            <p className="navbar__logo">{page}</p>
        </Navbar>
     );
}
 
export default Nav;