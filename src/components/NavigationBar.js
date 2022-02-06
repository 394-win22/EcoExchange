import React from "react";
import {Navbar, Container, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import { signInWithGoogle, useUserState, signOut } from "../utilities/firebase.js";
import Alert from 'react-bootstrap/Alert';

export const SignInButton = () => (
  <button
    className="btn btn-secondary mx-1"
    onClick={() => signInWithGoogle()}
  >
    Sign In
  </button>
);

export const SignOutButton = () => (
    <Nav.Link as={Link} to={"/"} className="btn btn-secondary mx-1 text-white" onClick={() => signOut()}>
        Sign Out
    </Nav.Link> 
);
  

const NavigationBar = () => {
    
    const [user] = useUserState();
    return (
        <div>

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to={"/"}>EcoExchange</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                            {user ? <Nav.Link as={Link} to={"/profile"}>Profile</Nav.Link> : null}
                            {user ? <Nav.Link as={Link} to={"/trades"}>Trades</Nav.Link> : null}
                            {user ? <Nav.Link as={Link} to={"/add-listing"}>Add Listing</Nav.Link> : null}
                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />

                            </NavDropdown> */}
                                {user ? <SignOutButton /> : <SignInButton />}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {!user? <Alert variant={'success'}> Sign in to offer trades and post listings! </Alert> : null}
        </div>
    );
}
export default NavigationBar
