import * as React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import PNotify from 'pnotify/dist/es/PNotify';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useState} from 'react';
import { useSelector } from '../../../../store/reducer';
import {Redirect} from 'react-router-dom'


function EditFoodCourt() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken);

    const [portalStaff,setPortalStaff] = useState('');
    const [clientId,setClientId] = useState('');
    let { id } = useParams();
    const [locations,setLocations] = useState([]);

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
            text: "El Food Court se editó satisfactoriamente :D",
            stack: window.stackBottomLeft,
            delay: 3000
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
                text: "No se pudo completar la creación del Food Court :(",
                stack: window.stackBottomLeft,
                delay:3000
            });
    };

    const updatePortalStaff = async (newPortalStaff,token) => {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/staff/` + id, {
            method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token,
            },
      mode: 'cors',
      body: JSON.stringify(newPortalStaff),
        }).then(() =>  toggleShow()).then(()=> setGoBack(true)).catch(() => toggleApiError())
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
        const email = e.target.formID.value;
        const role = e.target.formRole.value;
        const name = e.target.formName.value;
        const lastName = e.target.formLastName.value;
        const nameClient = e.target.formNameClient.value;

        const newPortalStaff = {
          role : role,
          nameClient: nameClient,
          email: email,
          name: name,
          lastName: lastName,
          clientId: clientId,
          locations: locations,
        }
        updatePortalStaff(newPortalStaff,reduxtoken);
      }

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
                setClientId(apiData.clientId)
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
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Row>
                                        <Form.Group className='mx-3 col-6' controlId="formID">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" defaultValue={portalStaff.email} required/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group className='mx-3 col-4' controlId="formName">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="text" defaultValue={portalStaff.name} required/>
                                            </Form.Group>
                                            <Form.Group className='mx-3 col-4' controlId="formLastName">
                                                <Form.Label>Apellidos</Form.Label>
                                                <Form.Control type="text" defaultValue={portalStaff.lastName} required/>
                                            </Form.Group>
                                            <Form.Group className='mx-3 col-4' controlId="formDNI">
                                                <Form.Label>DNI</Form.Label>
                                                <Form.Control type='text' placeholder="DNI/CE" defaultValue={id} required/>
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
                                                <Form.Control type="text" defaultValue={portalStaff.role} required/>
                                            </Form.Group>
                                            <Form.Group className='mx-3 col-3' controlId="formNameLocal">
                                                <Form.Label>Local</Form.Label>
                                                <Form.Control type="text" defaultValue={portalStaff.nameLocal} required/>
                                            </Form.Group>
                                            <Form.Group className='mx-3 col-3' controlId="formNameClient">
                                                <Form.Label>Cliente</Form.Label>
                                                <Form.Control type="text" defaultValue={portalStaff.nameClient} required/>
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                  <Form.Label>Locaciones</Form.Label>
                                                  <Select isMulti name="locationType" onChange={handleSelect} options={locationOptions} className="basic-multi-select" classNamePrefix="select"/>
                                                </Form.Group>
                                        </Form.Row>
                                        <Form.Row className=' d-flex justify-content-end'>
                                            <Button variant="outline-secondary" size='md' onClick={Back} className='mr-3'>Volver</Button>
                                            <Button type="submit" size='md' variant='success'>Guardar</Button>
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

export default EditFoodCourt