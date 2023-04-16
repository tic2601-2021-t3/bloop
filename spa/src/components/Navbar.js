import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/GetAll" activeStyle>
            GetAll
          </NavLink>
          <NavLink to="/GetOne" activeStyle>
            GetOne
          </NavLink>
          <NavLink to="/Post" activeStyle>
            Two
          </NavLink>
          <NavLink to="/login" activeStyle>
            Login
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;