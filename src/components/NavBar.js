import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Logo from '../images/logo.png'

const NavBar = () => {
    return <Navbar bg="light" variant="light" className="navbar" fixed="top">
        <Navbar.Brand href="#home">
            <img
            src={Logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            />
            {' Next Chat App '}
        </Navbar.Brand>

    </Navbar>
}


export default NavBar