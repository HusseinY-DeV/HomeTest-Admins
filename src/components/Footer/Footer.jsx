import React from 'react'
import styled from "styled-components";




const FooterContainer = styled.div`

    height: 7vh;
    display: flex;
    width:100%;
    justify-content: space-between;
    align-items:center;
    padding: 30px;
    background-color: #9bff6d;
    color : #353535;
    font-weight: lighter;

`;


const Footer = () => {
    return (
        <FooterContainer>
            <h3>Copyright &#9400;</h3>
            <h3>HomeTest &trade;</h3>
        </FooterContainer>
      );
}
 
export default Footer;