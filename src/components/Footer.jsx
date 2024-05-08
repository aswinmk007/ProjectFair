import React from 'react'

function Footer() {
  return (
    <>
      <div  style={{height:'300px',backgroundColor:'#08BDF7'}} className='mt-5 w-100'>
      <div className='d-flex justify-content-around mt-5 pt-5'>
        <div className="e-cart">
          <h4  style={{width:'260px'}}><i style={{color:'white'}} class="fa-solid fa-layer-group"></i><span style={{color:'white'}} className='ms-2'>Project Fair</span></h4>
          <p style={{color:'white'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Deserunt obcaecati consequuntur eius voluptates? <br /> officiis deserunt iste inventore ex, velit doloribus <br /> consectetur quae reprehenderit corrupti expedita!</p>
        </div>

        <div className='links d-flex flex-column'>
          <h4>Links</h4>
          <h5 style={{color:'white'}}>Home</h5>
          <h5 style={{color:'white'}}>Login</h5>
          <h5 style={{color:'white'}}>Register</h5>

        </div>

        <div className='guides d-flex flex-column'>
          <h4>Guides</h4>
          <h5 style={{color:'white'}}>React JS</h5>
          <h5 style={{color:'white'}}>React Routing</h5>
          <h5 style={{color:'white'}}>React Bootstarp</h5>
          <h5 style={{color:'white'}}>Redux</h5>
        </div>

        <div className='contact d-flex flex-column'>
          <h3>Contact Us</h3>
          <div className='d-flex'>
            <input style={{border:'none'}} type="email" className='shadow rounded' placeholder='Email please' />
            <button className='btn btn-info ms-1 rounded bg-warning'><i style={{color:'white',border:'none'}} className="fa-solid fa-arrow-right"></i></button>
          </div>
          <div  className='d-flex justify-content-between'>
            <a href=""><i style={{color:'white'}} class="fa-solid fa-envelope fa-1x"></i></a>
            <a href=""><i style={{color:'white'}} class="fa-brands fa-x-twitter fa-1x"></i></a>
            <a href=""><i style={{color:'white'}} class="fa-brands fa-square-instagram fa-1x"></i></a>
            <a href=""><i style={{color:'white'}} class="fa-brands fa-facebook fa-1x"></i></a>
            <a href=""><i style={{color:'white'}} class="fa-solid fa-phone fa-1x"></i></a>
          </div>
          </div>

      </div>
      <p className='text-center mt-5'>Copyright@Copy:2024 Project Fair</p>
    </div>
    </>
  )
}

export default Footer