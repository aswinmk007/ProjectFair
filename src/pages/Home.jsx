import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCards from '../components/ProjectCards'
import { Card } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { geHomeProjectAPI } from '../services/allAPI';
import homeimg from '../assets/homeimg.png'


function Home() {
  const [homeProjects,setHomeProjects] = useState([])
  const navigate = useNavigate()
  const [loginStatus,setLoginstatus] = useState(false)
  console.log(homeProjects);

  useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem("token")){
      setLoginstatus(true)
    }else{
      setLoginstatus(false)
    }
  },[])

  const handleProjects = ()=>{
    if(loginStatus){
      navigate('/projects')
    }else{
      toast.warning("please login to get full access to our projects!!!")
    }

  }

  const getHomeProjects =async ()=>{
    try{
      const result = await geHomeProjectAPI()
      console.log(result);
      if(result.status == 200){
        setHomeProjects(result.data)

      }


    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
    {/* landing */}
    <div style={{height:'100vh',backgroundColor:'#08BDF7'}} className='home w-100 d-flex justify-content-center align-items-center rounded'>
        <div className='container'>
            <div className='row align-items-center'>
                <div className="col-lg-6">
                    
                        <h1 style={{fontSize:'80px',color:'white',fontWeight:'bold'}} className='ms-1'><i class="fa-solid fa-layer-group"></i> Project Fair</h1>
              
                    <p style={{color:'white'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam neque cupiditate delectus voluptatem nostrum pariatur ab consectetur quos quae tempora facilis quibusdam odio eaque, voluptate in maxime. Aliquam, dolor vel.</p>
                    { loginStatus ?
                       <Link to={'/dashboard'} className='btn btn-warning'>Manage Your Projects <i class="fa-solid fa-arrow-right"></i></Link>
                       :
                       <Link to={'/login'} className='btn btn-warning'>Starts to Explore <i class="fa-solid fa-arrow-right"></i></Link>
                    }
                </div>
                <div className="col-lg-6">
                    <img width={'600px'} src={homeimg} alt="" />
                </div>
            </div>
        </div>
        </div>

        {/* projects */}

        <div className='mt-5'>
          <h2 className='text-center mb-5'>Explore Our Projects</h2>
          <marquee>
            <div className='d-flex'>
              {
                homeProjects?.length>0 &&
                homeProjects?.map(project=>(
                  <div key={project} className='me-5'>
                  <ProjectCards displayData={project}/>
                </div>

                ))
               }
            </div>
          </marquee>
          <div className='text-center'><button onClick={handleProjects} className='btn btn-link mt-3'>Click here to View More Projects...</button></div>
        </div>

        {/* testimony */}

        <div className='d-flex  align-items-center mt-5 mb-5 flex-column'>
          <h2>Our Testimonials</h2>
          <div className='d-flex justify-content-evenly align-items-center mt-3 w-100'>
          <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
          <img width={'90px'} height={'90px'} className='rounded img-fluid' src="https://img.freepik.com/premium-vector/man-profile-cartoon_18591-58482.jpg?w=360" alt="" />
          <span>Samson</span>

          </Card.Title>
        <Card.Text>
          <div className='d-flex d-flex justify-content-center'>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>




          </div>
         <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo consequatur perspiciatis velit blanditiis</p>
        </Card.Text>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
          <img width={'90px'} height={'90px'} className='rounded img-fluid' src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png" alt="" />
          <span>David Miller</span>

          </Card.Title>
        <Card.Text>
          <div className='d-flex d-flex justify-content-center'>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>




          </div>
         <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo consequatur perspiciatis velit blanditiis</p>
        </Card.Text>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
          <img width={'90px'} height={'90px'} className='rounded img-fluid' src="https://img.freepik.com/premium-vector/women-trendy-icon-avatar-character-cheerful-happy-people-flat-vector-illustration-round-frame-female-portraits-group-team-adorable-girl-isolated-white-background_275421-271.jpg" alt="" />
          <span>Alexia</span>

          </Card.Title>
        <Card.Text>
          <div className='d-flex d-flex justify-content-center'>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>



          </div>
         <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo consequatur perspiciatis velit blanditiis</p>
        </Card.Text>
      </Card.Body>
    </Card>

          </div>
        </div>

        <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Home