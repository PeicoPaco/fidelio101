import * as React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import PNotify from 'pnotify/dist/es/PNotify';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useState} from 'react';
import { useSelector } from '../../../../store/reducer';
import {Redirect} from 'react-router-dom'


function DetailsPortalStaff() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken);

    const [portalStaff,setPortalStaff] = useState('');
    const [profiles,setProfiles]=useState([]);
    let { id } = useParams();
    
      
      useEffect(()=>{
        fetch(`${process.env.REACT_APP_BASE_URL}/portal/`, {
          headers:{
            "Content-Type": "application/json",   
            Authorization: 'Bearer ' + reduxtoken,
          }
        })
            .then((response) =>  response.json())
            .then((apiData) =>{
              setProfiles(apiData)
              })
      },[])

        useEffect(() =>{
            fetch(`${process.env.REACT_APP_BASE_URL}/staff/`+ id , {
                headers:{
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + reduxtoken
            },
                mode:'cors',  
            })
            .then((response) =>  response.json())
            .then((apiData) =>{
                setPortalStaff(apiData)
          }).catch((e) => console.log(e))
          }, [])
          
          const [goBack,setGoBack]=useState(false);

          const Back = () =>{
            setGoBack(true)
          }


      if(goBack){
        return <Redirect to='/portalstafflist'/>
        }
        

 return (
        <>
           <Row>
                <Col>
                    <Card className='m-3'>
                        <Card.Header>
                            <Card.Title as="h5">Editar Portal Staff</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form>
                                        <Form.Row>
                                        <Form.Group className='mx-3 col-6' controlId="formID">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" defaultValue={portalStaff.email} readOnly/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group className='mx-3 col-4' controlId="formName">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="text" defaultValue={portalStaff.name} readOnly/>
                                            </Form.Group>
                                            <Form.Group className='mx-3 col-4' controlId="formDNI">
                                                <Form.Label>DNI</Form.Label>
                                                <Form.Control type='text' placeholder="DNI/CE" defaultValue={id} readOnly/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className='justify-content'>
                                            <Form.Group className='mx-3 col-4' controlId="formCreatedBy">
                                                <Form.Label>Creado Por</Form.Label>
                                                <Form.Control className='mr-3' defaultValue={portalStaff.createdBy} readOnly/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className='justify-content'>
                                            <Form.Group className='mx-3 col-3' controlId="formRole">
                                                <Form.Label>Rol</Form.Label>
                                                <Form.Control type="text" defaultValue={portalStaff.role} readOnly/>
                                            </Form.Group>
                                            <Form.Group className='mx-3 col-3' controlId="formIdLocal">
                                                <Form.Label>Local</Form.Label>
                                                <Form.Control type="text" defaultValue={portalStaff.nameLocal} readOnly/>
                                            </Form.Group>
                                            <Form.Group className='mx-3 col-3' controlId="formClientId">
                                                <Form.Label>Cliente</Form.Label>
                                                <Form.Control type="text" defaultValue={portalStaff.nameClient} readOnly/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Group className='m-3' controlId="formProfile">
                                                <Form.Label>Perfiles</Form.Label>
                                                {Object.keys(profiles).map((profile) => (
                                                    <Form.Check key={profile} type="checkbox" label={profiles[profile]} defaultChecked={
                                                        portalStaff.profile && portalStaff.profile.includes(profiles[profile])
                                                    } disabled/>
                                                ))}
                                        </Form.Group>
                                        <Form.Row className=' d-flex justify-content-end'>
                                            <Button variant="outline-secondary" size='md' onClick={Back} className='mr-3'>Volver</Button>
                                        </Form.Row>
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default DetailsPortalStaff