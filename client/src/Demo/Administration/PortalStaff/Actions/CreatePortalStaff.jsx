import * as React from 'react';
import { Row, Col, Card, Form, Button} from 'react-bootstrap';
import Select from 'react-select';
import PNotify from 'pnotify/dist/es/PNotify';
import { useSelector } from '../../../../store/reducer';
import {useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import makeAnimated from 'react-select/animated';

function CreatePortalStaff() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken)
    const email = useSelector((state) => state.firebaseauth.currentUser.email)
    const [locals,setLocals]=useState([]);
    const [client,setClient]=useState([]);
    const [profiles,setProfiles]=useState([]);
    const [orgName,setOrgName] = useState("");
    const [local,setLocal] = useState("");
    const animatedComponents = makeAnimated();

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
            text: "El Staff de Portal se creó satisfactoriamente :D",
            stack: window.stackBottomLeft,
            delay:3000
        });
    };
    const toggleApiError = (errormessage) => {
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
                text: errormessage,
                stack: window.stackBottomLeft,
                delay:3000
            });
    };
    

    const postStaff = async (newStaff,token) => {
      await fetch(`${process.env.REACT_APP_BASE_URL}/staff`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + token,
              },
        mode: 'cors',
        body: JSON.stringify(newStaff),
          }).then((response) =>  {
            if(response.ok){
              toggleShow()
              setGoBack(true)
            } else{
              response.json().then((error) => {
                handleError(error.code)
              })
            }
          })
      }
    
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

  const handleError = async (codeError) => {
    switch(codeError) {
        case 6: 
        toggleApiError('DNI ya está en uso')
        break;
        case 'BF-1':
        toggleApiError('Email ya está en uso');
        break;
        default:
        toggleApiError('Ocurrió un error inesperado')
        break;
    }
} 

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.formName.value;
        const lastName = e.target.formLastName.value;
        const emailKey = e.target.formEmail.value;
        const dni = e.target.formDNI.value;
        const role = e.target.formRole.value;
        const nameClient = e.target.formClient.value;
        const createdBy= email;
            postStaff({
              name: name,
              lastName: lastName,
              email: emailKey,
              dni: dni,
              role: role,
              nameLocal: local,
              nameClient: nameClient,
              createdBy:createdBy,
            },reduxtoken);         
      }
      
      const [goBack,setGoBack]=useState(false);

      if(goBack){
        return <Redirect to='/portalstafflist'/>
        }

        const handleOrg = (e) => {
          Object.values(client).map((item) => {
            setOrgName(e.target.value)
            if (item.name === e.target.value) {
              fetch(`${process.env.REACT_APP_BASE_URL}/localClient/`+item.id, {
                headers:{
                  "Content-Type": "application/json",   
                  Authorization: 'Bearer ' + reduxtoken,
                }
              })
              .then((response) =>  {
                if (response.ok){
                  return response.json()
                } else {
                  return []
                }
              })
              .then((apiData) =>{
                setLocals(apiData);
                })
            }});
        }

        const handleSelect = (e) => {
          const arrayL = []
          e.map((item) => {
            arrayL.push(item.value)
          })
          setLocal(arrayL)
        }
      
        const optionsLocal = 
          locals.map((item) => ({
            value: item.name,
            label: item.name
          }))
        

        const optionsClient = client.map((item) => {
          return (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>

          )
        })

        const Back = () =>{
          setGoBack(true)
        }

 return (
        <>
           <Row>
                <Col>
                    <Card className='m-3'>
                        <Card.Header>
                            <Card.Title as="h5">Crear Nuevo Portal Staff</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form onSubmit={handleSubmit} className='justify-content'>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="text" placeholder="Email" required/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formName">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="text" placeholder="Nombre" required/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group controlId="formLastName" className='col-3'>
                                                <Form.Label>Apellidos</Form.Label>
                                                <Form.Control type="text" placeholder="Apellidos" required/>
                                            </Form.Group>
                                            <Form.Group controlId="formDNI" className='col-3'>
                                                <Form.Label>DNI</Form.Label>
                                                <Form.Control type='tel' placeholder="DNI/CE" maxLength={8} required/>
                                            </Form.Group>
                                            <Form.Group controlId="formRole">
                                                <Form.Label>Rol</Form.Label>
                                                <Form.Control size="md" as="select" className='mr-3' placeholder='Rol'>
                                                    <option>Seleccionar</option>
                                                    <option>{profiles.profile1}</option>
                                                    <option>{profiles.profile2}</option>
                                                    <option>{profiles.profile3}</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className='justify-content'>
                                            <Form.Group as={Col} controlId="formClient" className='mr-6 col-5'>
                                                <Form.Label>Cliente</Form.Label>
                                                <Form.Control size="md" as="select" onChange={handleOrg} className='mr-3' placeholder='Client Id' required>
                                                <option></option>
                                                    {optionsClient}
                                                </Form.Control>
                                            </Form.Group>
                                            {orgName != "" ? (
                                                <Form.Group className='mr-6 col-5'>
                                                  <Form.Label>Local</Form.Label>
                                                      <Select isMulti name="local" components={animatedComponents} onChange={handleSelect} options={optionsLocal} className="basic-multi-select" classNamePrefix="select" required/>      
                                            </Form.Group>
                                            ):(
                                              <Form.Group className='mr-6 col-5'>
                                                <Form.Label>Local</Form.Label>
                                                      <Select isMulti name="local" components={animatedComponents} onChange={handleSelect} options={optionsLocal} className="basic-multi-select" classNamePrefix="select" disabled/>      
                                            </Form.Group>
                                            )}
                                            </Form.Row>
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

export default CreatePortalStaff