import React from 'react';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink
    } from "mdbreact";
    
function Nav(){
    return(
        <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Budgeter</strong>
        </MDBNavbarBrand>
          <MDBNavbarNav left>
            
          </MDBNavbarNav>
          <MDBNavbarNav right>
          </MDBNavbarNav>
      </MDBNavbar>
    )
}
export default Nav;