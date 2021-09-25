import React from 'react'

import { Navbar, Nav } from 'react-bootstrap'

import { useAuth } from '../../contexts/AuthContext'

import './NavigationBar.scss'

const NavigationBar = () => {

  const { logout, currentUser, loggedIn } = useAuth()

  return (
    <section className="navbar-wrapper">
      <Navbar fixed="top" expand="lg" className="navbar">
        <Navbar.Brand href="/home">HouseDuties</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {loggedIn && currentUser !== null ?
              <>
                <Nav.Link href={"/user/profile/" + currentUser.userId}>{currentUser.fullName}</Nav.Link>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/user/settings">Edit Profile</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
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
