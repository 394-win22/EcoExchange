import React from "react";
import {Navbar, Container, Nav} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { signInWithGoogle, useUserState, signOut } from "../utilities/firebase.js";


const SignInButton = () => (
    <button className="btn btn-secondary btn-sm"
        onClick={() => signInWithGoogle()}>
      Sign In
    </button>
  );

const SignOutButton = () => (
    <button className="btn btn-secondary btn-sm"
        onClick={() => signOut()}>
      Sign Out
    </button>
  );
  
// const SignInOrOutButton = () => {
//     const [user] = useUserState();
//     return (
//     <div>
//         { user ? <SignOutButton /> : <SignInButton />}
//     );
// };

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
                            {/* <Nav.Link as={Link} to={"/profile"}>Profile</Nav.Link> */}
                            <Nav.Link as={Link} to={"/add-listing"}>Add Listing</Nav.Link>
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
        </div>
    );
}
export default NavigationBar
