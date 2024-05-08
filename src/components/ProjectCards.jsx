import React,{useState} from 'react'
import { Card,Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../services/serverUrl';


function ProjectCards({displayData}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card onClick={handleShow} className='shadow  btn' style={{ width: '28rem' }}>
      <Card.Img height={'200px'} variant="top" src={`${SERVER_URL}/uploads/${displayData?.projectImage}`} />
      <Card.Body>
        <Card.Title>{displayData?.title}</Card.Title>
      
      </Card.Body>
    </Card>

    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className="col-lg-6">
              <img src={`${SERVER_URL}/uploads/${displayData?.projectImage}`} className='img-fluid' alt="" />
            </div>
            <div className="col-lg-6">
              <h3>{displayData?.title}</h3>
              <h5><span className='fw-bolder'>Languages Used</span> : {displayData?.language}</h5>
              <p style={{textAlign:'justify'}}><span className='fw-bolder'>Description:</span>{displayData?.overview}</p>
            </div>
          </div>
          <div className='float-start mt-2'>
            <a href={displayData?.github} target='_blank' className='btn btn-primary' onClick={handleClose}><i style={{color:'black'}} className='fa-brands fa-github fa-1x'></i></a>
            <a href={displayData?.website} target='_blank' className='btn btn-primary ms-2' onClick={handleClose}><i style={{color:'black'}} className='fa-solid fa-link fa-1x'></i></a>

          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCards