import React, { Fragment, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { load_free_times } from "../actions/time";


const MyNavbar = ( {isAuthenticated, logout, type} ) => {


    const links = () =>{
      if (isAuthenticated && type === 'user') {
        return(
          userLinks
        )
      }
      else if (isAuthenticated && type === 'vet'){
        return(
          vetLinks
        )
      }
      else if (isAuthenticated && type === 'org'){
        return(
          orgLinks
        )
      }
      else{
        return(
          guestLinks
        )
      }
    }

    const guestLinks = (
      <Fragment>
        <Nav.Link href="/register" style={{ fontSize: "1.25rem" }}>Register</Nav.Link>
        <Nav.Link href="/login" style={{ fontSize: "1.25rem" }}>Login</Nav.Link>
        <Nav.Link href="/about" style={{ fontSize: "1.25rem" }}>About</Nav.Link>
    </Fragment>
    
        
    );

    const userLinks = (
        <Fragment>
            <Nav.Link href="/dashboard" style={{ fontSize: "1.25rem" }}>Dashboard</Nav.Link>
            <Nav.Link href="/message" style={{ fontSize: "1.25rem"  }}>Message</Nav.Link>
            <Nav.Link href="/report" style={{ fontSize: "1.25rem" }}>Vets</Nav.Link>
            <Nav.Link href="/org_report" style={{ fontSize: "1.25rem" }}>Orgs</Nav.Link>
            <Nav.Link href="/about" style={{ fontSize: "1.25rem" }}>About</Nav.Link>
            <Nav.Link onClick={logout} href="#!" style={{ fontSize: "1.25rem" }}>Logout</Nav.Link>
        </Fragment>
    );

    const vetLinks = (
      <Fragment>
          <Nav.Link href="/vet" style={{ fontSize: "1.25rem" }}>Vet Profile</Nav.Link>
          <Nav.Link href="/vet_s" style={{ fontSize: "1.25rem"  }}>Vet Schedule</Nav.Link>
          <Nav.Link href="/message_vet" style={{ fontSize: "1.25rem" }}>Message</Nav.Link>
          <Nav.Link href="/about" style={{ fontSize: "1.25rem"  }}>About</Nav.Link>
          <Nav.Link onClick={logout} href="#!" style={{ fontSize: "1.25rem"  }}>Logout</Nav.Link>
      </Fragment>
   );

    const orgLinks = (
      <Fragment>
          <Nav.Link href="/org" style={{ fontSize: "1.25rem" }}>Org Dashboard</Nav.Link>
          <Nav.Link href="/message_org" style={{ fontSize: "1.25rem" }}>Message</Nav.Link>
          <Nav.Link onClick={logout} href="#!" style={{ fontSize: "1.25rem" }}>Logout</Nav.Link>
          <Nav.Link href="/about" style={{ fontSize: "1.25rem" }}>About</Nav.Link>
      </Fragment>
  );

  return (
     <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/" style={{ fontSize: "30px" }}>Saving Animals</Navbar.Brand>
                <Navbar.Toggle className="display: inline-block" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto d-flex justify-content-between w-100">
                        {links()}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    type: state.auth.type
});

export default connect(mapStateToProps, { logout, load_free_times })(MyNavbar);