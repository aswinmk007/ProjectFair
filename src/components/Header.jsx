import React, { useContext } from 'react'
import { Navbar,Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../Contexts/TokenAuth'



function Header({insideDashBoard}) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const navigate =  useNavigate()
  const logOut = ()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')

  }
  return (
    <Navbar style={{backgroundColor:'#08BDF7',zIndex:'1'}} className='border shadow top-0 position-fixed w-100'>
        <Container>
          <Navbar.Brand>
            
         <Link className='fw-bolder' style={{color:'white',textDecoration:'none'}} to={'/'}><i class="fa-solid fa-layer-group"></i><span>Project Fair</span></Link>

            
          </Navbar.Brand>
        {insideDashBoard && 
        <div className='ms-auto'>
          <button onClick={logOut} className='btn btn-link'>LogOut<i className='fa-solid fa-arrow-right'></i></button>
        </div>
        }
        </Container>
      </Navbar>
  )
}

export default Header