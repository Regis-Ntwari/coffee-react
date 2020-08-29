import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCoffee} from '@fortawesome/free-solid-svg-icons'
export class Navigation extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Link to={"/"} className={"navbar-brand"}>
                        <FontAwesomeIcon icon={faCoffee}/>
                        Coffee shop
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <NavDropdown title="Options" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/categories">Categories</NavDropdown.Item>
                                <NavDropdown.Item href="/products">Products</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.3">Transactions</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigation
