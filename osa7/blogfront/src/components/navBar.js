import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LoginForm from "./loginForm";


function NavBar(){

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link  to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link  to="/blogs">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/newblog">create blog</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <LoginForm></LoginForm>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar> 
    )
}

export default NavBar