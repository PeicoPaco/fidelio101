import * as React from 'react';
import { Row, Col, Card, Form, Button} from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import PNotify from 'pnotify/dist/es/PNotify';
import { useSelector } from '../../../../store/reducer';
import {useState} from 'react'
import {Redirect} from 'react-router-dom'

function CreateClient() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken)
    const email = useSelector((state) => state.firebaseauth.currentUser.email)
    const [locations,setLocations] = useState([]);
    const animatedComponents = makeAnimated();

    const locationOptions = [
        { value: 'FoodCourt', label: 'FoodCourt'},
        { value: 'Hotel', label: 'Hotel'},
        { value: 'Bar', label: 'Bar'},
        { value: 'Restaurant', label: 'Restaurant'},
    ];

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
            text: "El cliente se creó satisfactoriamente :D",
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
                text: "No se pudo completar la creación de El Cliente :(",
                stack: window.stackBottomLeft,
                delay:3000
            });
    };

    const postClient = async (newClient,reduxtoken) => {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/clients`, {
            method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + reduxtoken,
            },
      mode: 'cors',
      body: JSON.stringify(newClient),
        }).then(() =>  toggleShow())
          .then(() => setGoBack(true))
          .catch(() => toggleApiError())
        }

    const handleSelect = (e) => {
      const arrayLT = []
      e.map((item) => {
        arrayLT.push(item.value)
      })
      setLocations(arrayLT)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.formName.value;
        const repLegal = e.target.formRepLegal.value;
        const orgEmail = e.target.formEmail.value;
        const phone = e.target.formPhone.value;
        const address = e.target.formLegalAddress.value;
        const ruc = e.target.formRUC.value;
        const createdBy= email;

        if(locations.length>0){
          const newClient = {
            name: name,
            legalRepresentative:repLegal,
            phone:phone,
            email:orgEmail,
            legalAddress:address,
            ruc:ruc,
            createdBy:createdBy,
            locationType: locations,
          }
          postClient(newClient,reduxtoken);
        }else{
          alert('Debe seleccionar al menos una locación')
        }
      }
      const [goBack,setGoBack]=useState(false);

      const Back = () =>{
        setGoBack(true)
      }

      if(goBack){
        return <Redirect to='/clientlist'/>
        }
      

        return (
            <>
               <Row>
                    <Col>
                        <Card className='m-3'>
                            <Card.Header>
                                <Card.Title as="h5">Crear Nuevo Cliente</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form onSubmit={handleSubmit} className='justify-content'>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formName">
                                                    <Form.Label>Nombre</Form.Label>
                                                    <Form.Control type="text" placeholder="Nombre" required/>
                                                </Form.Group>
                                            </Form.Row>
                                                <Form.Group controlId="formRepLegal" className=''>
                                                    <Form.Label>Representante Legal</Form.Label>
                                                    <Form.Control type='text' placeholder="Representante Legal" required/>
                                                </Form.Group>
    
                                                <Form.Group controlId="formEmail" className=''>
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type='email' placeholder="Email" required/>
                                                </Form.Group>
                                                <Form.Group controlId="formPhone" className=''>
                                                    <Form.Label>Teléfono</Form.Label>
                                                    <Form.Control type="tel" placeholder="Teléfono" pattern="9[0-9]{8}" maxLength="9" required />
                                                </Form.Group>
                                            <Form.Group controlId="formLegalAddress" className=''>
                                                    <Form.Label>Dirección Legal</Form.Label>
                                                    <Form.Control type='text' placeholder="Dirección" required/>
                                                </Form.Group>
                                            <Form.Group controlId="formRUC" className=''>
                                                    <Form.Label>RUC</Form.Label>
                                                    <Form.Control type="tel" placeholder="Teléfono" pattern="(20|10)[0-9]{9}" maxLength="11" required />
                                            </Form.Group>
                                            <Form.Row>
                                                <Form.Group className='mr-5'>
                                                    <Form.Label>Locaciones</Form.Label>
                                                    <Select isMulti name="locations" components={animatedComponents} onChange={handleSelect} options={locationOptions} className="basic-multi-select" classNamePrefix="select"/>
                                                </Form.Group>
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

export default CreateClient