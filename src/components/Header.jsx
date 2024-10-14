import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
   <>
         <Navbar className="bg-secondary">
        <Container>
        <Link to={'/'} className='nav-link'>
          <Navbar.Brand className='fw-bold'>
          <i className="fas fa-piggy-bank fa-xl" style={{color: "#06327f",}} />{' '}
            Expense Tracker
            
          </Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
   </>
  )
}

export default Header
