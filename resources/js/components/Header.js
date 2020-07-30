import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {Link} from "react-router-dom";

function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="sidebar">
            <Navbar.Brand as={Link} to={'/'} className="ml-lg-2 mb-lg-5">Storage</Navbar.Brand>
            <Navbar.Toggle aria-controls="sidebar-navbar-nav"/>
            <Navbar.Collapse id="sidebar-navbar-nav" className="align-items-start w-100">
                <Nav className="sidebar-nav w-100">
                    <Nav.Link as={Link} to={`/`}>
                        Storages
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
