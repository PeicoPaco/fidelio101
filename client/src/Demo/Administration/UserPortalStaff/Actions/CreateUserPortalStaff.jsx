import * as React from 'react';
import { Row, Col, Card, Form, Button} from 'react-bootstrap';
import PNotify from 'pnotify/dist/es/PNotify';
import { useSelector } from '../../../../store/reducer';
import { auth } from '../../../../fb';
import { sendPasswordResetEmail } from '@firebase/auth';
import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {useEffect} from 'react'

function CreateUserPortalStaff() {


    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken)
    const email = useSelector((state) => state.firebaseauth.currentUser.email)
    const [profiles,setProfiles]=useState([]);
    const [showmessage, setShowMessage] = useState(false);
    const [errormessage, setErrorMessage] = useState(false);
    const [staff,setStaff]=useState([]);
    const [client, setClient] = useState([]);
    const [emailStaff,setEmailStaff]=useState('');
    
    const toggleShow = () => {
      if (typeof window.stackBottomLeft === 'undefined') {
        window.stackBottomLeft = {
            dir1: 'right',
            dir2: 'up',
            firstpos1: 25,
            firstpos2: 25,
            push: 'top'
        };
    }
        PNotify.success({
            title: 'Completado',
            text: "El miembro de Portal Staff se creó satisfactoriamente :D",
            stack: window.stackBottomLeft,
            delay:3000
        });
    };
    const toggleApiError = () => {
      if (typeof window.stackBottomLeft === 'undefined') {
        window.stackBottomLeft = {
            dir1: 'right',
            dir2: 'up',
            firstpos1: 25,
            firstpos2: 25,
            push: 'top'
        };
    }
            PNotify.error({
                title: 'Error',
                text: "No se pudo crear al miembro de Portal Staff :(",
                stack: window.stackBottomLeft,
                delay:3000
            });
    };

    const postUserPortalStaff = async (staff,token) => {

      const newUserPortalStaff = {
        clientId: staff.clientId,
        email: staff.email,
        profile: staff.profile,
        giveAccessAt: new Date(),
        giveAccessBy: email,
      }
            await fetch(`${process.env.REACT_APP_BASE_URL}/staff/`+staff.dni, {
            method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token,
            },
      mode: 'cors',
      body: JSON.stringify(newUserPortalStaff),
        }).then(() =>  toggleShow())
          .then(()=>sendPasswordResetEmail(auth, staff.email)
                    .then(()=>setShowMessage(true))
                    .catch(()=>setErrorMessage(true))
                  )
          .then(()=>setGoBack(true),setShowMessage(true))
          .catch(() => toggleApiError(),setShowMessage(true))
        }

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

          useEffect(()=>{
              fetch(`${process.env.REACT_APP_BASE_URL}/clients/active`, {
                headers:{
                  "Content-Type": "application/json",
                  Authorization: 'Bearer ' + reduxtoken,
                }
              })
                  .then((response) =>  response.json())
                  .then((apiData) =>{
                      setClient(apiData)
                    })
          },[])

    const handleSubmit = (e) => {
        let dni = "";
        let clientId= "";
        Object.values(staff).map((item) => {
          if(item.name === e.target.formName.value){
            dni = item.dni;
            clientId = item.clientId;
          }
        });
        e.preventDefault();
        const emailPortalStaff = e.target.formEmail.value;
        const profilesChecked = e.target.formProfiles;
        const profilesCheckedArray = [];
        for (let i = 0; i < profilesChecked.length; i++) {
          if (profilesChecked[i].checked) {
            profilesCheckedArray.push(Object.values(profiles)[i]);
          }
        }
        if (profilesCheckedArray.length === 0) {
            alert('Debe seleccionar al menos un perfil');
        } else {
          const staff = {
            email:emailPortalStaff,
            dni:dni,
            clientId:clientId,
            profile:profilesCheckedArray,
          }
          postUserPortalStaff(staff,reduxtoken);
        }
      }

    const handleClient = (e) => {
        e.preventDefault();
        Object.values(client).map((item) => {
          if(item.name === e.target.value){
            fetch(`${process.env.REACT_APP_BASE_URL}/staffByNoProfile/`+item.id, {
              headers:{
                "Content-Type": "application/json",   
                Authorization: 'Bearer ' + reduxtoken,
              }
            })
                .then((response) =>  response.json())
                .then((apiData) =>{
                    setStaff(apiData)
                  })
          }
        });

    }

    const handleName = (e) => {
      e.preventDefault();
      Object.values(staff).map((item) => {
        if(item.name === e.target.value){
          setEmailStaff(item.email)
        }
      });
    }

    const namesClients = client.map((item) => {
      return (
        <option key={item.name} value={item.name}>{item.name}</option>
      )
    })

      const [goBack,setGoBack]=useState(false);

      const Back = () =>{
        setGoBack(true)
      }


      if(goBack){
        return <Redirect to='/userportalstafflist'/>
        }
      
      const namesWithOutProfile = staff.map((staff) => {
        return (
          <option key={staff.name} value={staff.name}>{staff.name}</option>
        )
      })

 return (
        <>
           <Row>
                <Col>
                    <Card className='m-3'>
                        <Card.Header>
                            <Card.Title as="h5">Crear Nuevo User Portal Staff</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form onSubmit={handleSubmit} className='justify-content'>
                                        <Form.Group controlId="nameClient" onChange={handleClient} className=''>
                                          <Form.Label>Cliente</Form.Label>
                                          <Form.Control size="md" as="select" className='mr-3' required>
                                            <option>Seleccionar</option>
                                            {namesClients}
                                          </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="formName" onChange={handleName} className=''>
                                            <Form.Label>Nombre</Form.Label>
                                            {/* <Form.Control type='text' placeholder="Email" required/> */}
                                            <Form.Control size="md" as="select" className='mr-3' required>
                                                    <option>Seleccionar</option>
                                                    {namesWithOutProfile}
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="formEmail" className=''>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type='email' placeholder="Email" value={emailStaff} disabled/>
                                        </Form.Group>
                                        <div className='text-center text-primary'>
                                            {showmessage ? 
                                            <p>Check your email for the link</p> : 
                                            <></>
                                            }
                                        </div>
                                        <div className='text-center text-danger'>
                                            {errormessage ? 
                                            <p>Email not found</p> : 
                                            <></>
                                            }
                                        </div>
                                        <Form.Group controlId="formProfiles" className=''>
                                                <Form.Label>Profiles</Form.Label>
                                                {Object.keys(profiles).map((profile) => (
                                                    <Form.Check key={profile} type="checkbox" label={profiles[profile]}/>
                                                ))}
                                        </Form.Group>
                                        <Form.Row className=' d-flex justify-content-end'>
                                            <Button variant="outline-secondary" size='md' onClick={Back} className='mr-3'>Volver</Button>
                                            <Button type="submit" size='md' variant='success'>Crear</Button>
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

export default CreateUserPortalStaff