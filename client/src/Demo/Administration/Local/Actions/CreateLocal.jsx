import * as React from 'react';
import { Row, Col, Card, Form, Button, NavLink} from 'react-bootstrap';
import Select from 'react-select';
import PNotify from 'pnotify/dist/es/PNotify';
import { useSelector } from '../../../../store/reducer';
import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {useEffect} from 'react'

function CreateLocal() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken)
    const email = useSelector((state) => state.firebaseauth.currentUser.email)
    const [location,setLocation]=useState([])
    const [client,setClient]=useState([])
    const [selectLocation,setSelectLocation]=useState([])
    const [selectClient,setSelectClient]=useState([])
    const [bool,setBool]=useState(true)
    
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
            text: "El Local se creó satisfactoriamente :D",
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
                text: "No se pudo completar la creación del Local :(",
                stack: window.stackBottomLeft,
                delay:3000
            });
    };

    const postLocal = async (newLocal,token) => {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/local`, {
            method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token,
            },
      mode: 'cors',
      body: JSON.stringify(newLocal),
        }).then(() =>  toggleShow()).then(()=>setGoBack(true)).catch(() => toggleApiError())
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
            
              fetch(`${process.env.REACT_APP_BASE_URL}/location/active`, {
              headers:{
                "Content-Type": "application/json",   
                Authorization: 'Bearer ' + reduxtoken,
              }
            })
                .then((response) =>  response.json())
                .then((apiData) =>{
                  setLocation(apiData);
                    setBool(null);
                  })
          
        },[bool])

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.formName.value;
        const address= e.target.formAddress.value;
        const createdBy= email;
        const newLocal = {
          name: name,
          address:address,
          nameLocation: selectLocation,
          nameClient: selectClient,
          createdBy:createdBy,
        }
        postLocal(newLocal,reduxtoken);
      }

      const arrayLocation = [];
      location.map((item) => {
        arrayLocation.push({value:item.name,label:item.name})
      });
      const locationOptions = arrayLocation;

      const arrayClient = [];
      client.map((item) => {
        arrayClient.push({value:item.name,label:item.name})
      });
      const clientOptions = arrayClient;
      
      const handleSelectLocation = (e) => {
          setSelectLocation(e.value)
      };
      const handleSelectClient = (e) => {
          setSelectClient(e.value)
      };

      const optionsLocation = ( 
        <Select name="locationType" className="basic-single" classNamePrefix="select" 
            onChange={handleSelectLocation} options={locationOptions} required/>
      );
  
      const optionsClient = ( 
        <Select name="locationType" className="basic-single" classNamePrefix="select" 
            onChange={handleSelectClient} options={clientOptions} required/>
      );

      const [goBack,setGoBack]=useState(false);

      const Back = () =>{
        setGoBack(true)
      }


      if(goBack){
        return <Redirect to='/local'/>
        }
      

        return (
            <>
               <Row>
                    <Col>
                        <Card className='m-3'>
                            <Card.Header>
                                <Card.Title as="h5">Crear Local</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form onSubmit={handleSubmit} className='justify-content'>
                                            <Form.Row className='justify-content'>
                                                <Form.Group className='mr-5' controlId="formClient">
                                                    <Form.Label>Cliente</Form.Label>
                                                        {optionsClient}
                                                </Form.Group>
                                                <Form.Group className='ml-5' controlId="formLocation">
                                                    <Form.Label>Tipo de Locacion</Form.Label>
                                                        {optionsLocation}
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formName">
                                                    <Form.Label>Nombre</Form.Label>
                                                    <Form.Control type="text" placeholder="Nombre" required/>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row className='justify-content'>
                                                <Form.Group as={Col} controlId="formAddress">
                                                    <Form.Label>Dirección</Form.Label>
                                                    <Form.Control type="text" placeholder="Dirección" required/>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row className=' d-flex justify-content-end'>
                                                <Button variant="outline-secondary" size='md' className='mr-2' onClick={Back}>Volver</Button>
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


export default CreateLocal