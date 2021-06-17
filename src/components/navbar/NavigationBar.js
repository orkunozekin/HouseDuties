import React, { useState, useEffect } from 'react'

import { useHistory } from "react-router-dom"
import { Navbar, Nav } from 'react-bootstrap'
import axios from 'axios'

import TokenService from '../../TokenService'

import './NavigationBar.scss'

const NavigationBar = ({ setLoggedIn, loggedIn }) => {


  const [user, setUser] = useState({})

  let history = useHistory();

  const logout = () => {
    TokenService.clearAuthToken();
    setUser({});
    setLoggedIn(false);
    history.push('/');
  }

  const populateUser = () => {
    if (TokenService.hasAuthToken()) {
      setUser(TokenService.getUser())
      setLoggedIn(true);
    }
  }

  useEffect(() => {
    populateUser();
  }, [])

  return (
    <section className="navbar-wrapper">
      <Navbar fixed="top" expand="lg" className="navbar">
        <Navbar.Brand href="/user/home">HomeDuties</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {loggedIn && user ?
              <>
                <Nav.Link href={"/user/profile/" + user.userId}>{user.userFullName}</Nav.Link>
                <Nav.Link href="/user/home">Home</Nav.Link>
                <Nav.Link href="/user/settings">Edit Profile</Nav.Link>
                <Nav.Link onClick={() => logout()}>Logout</Nav.Link></>
              :
              <Nav.Link href="/">Login</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </section>
  )
}

export default NavigationBar
