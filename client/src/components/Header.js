import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ({ account }) => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container fluid>
                {/* Logo */}
                <Navbar.Brand className="header-logo">
                    SupplyChain DApp
                </Navbar.Brand>

                {/* Links next to the logo */}
                <Nav className="me-auto">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/product" className="nav-link">Product</Link>
                </Nav>

                {/* User dropdown on the far-right */}
                <Nav className="ms-auto">
                    <NavDropdown
                        title={<i className="bi bi-person-circle" style={{ fontSize: "1.5rem" }}></i>} // Person icon
                        id="user-dropdown"
                        align="end"
                    >
                        {account ? (
                            <>
                                <NavDropdown.Item>
                                    Connected: {account.substring(0, 6)}...{account.slice(-4)}
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                            </>
                        ) : (
                            <NavDropdown.Item>Not Connected</NavDropdown.Item>
                        )}
                        <NavDropdown.Item as={Link} to="/auth">Sign in</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
