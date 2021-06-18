import React from 'react'

import { Navbar, Nav } from 'react-bootstrap'

import { useAuth } from '../../contexts/AuthContext'

import './NavigationBar.scss'

const NavigationBar = () => {

  const { logout, currentUser, loggedIn } = useAuth()

  return (
    <section className="navbar-wrapper">
      <Navbar fixed="top" expand="lg" className="navbar">
        <Navbar.Brand href="/user/home">HouseDuties</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {loggedIn && currentUser ?
              <>
                <Nav.Link href={"/user/profile/" + currentUser.userId}>{currentUser.userFullName}</Nav.Link>
                <Nav.Link href="/user/home">Home</Nav.Link>
                <Nav.Link href="/user/settings">Edit Profile</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link></>
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
