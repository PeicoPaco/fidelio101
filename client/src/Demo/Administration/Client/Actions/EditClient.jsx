import * as React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import PNotify from 'pnotify/dist/es/PNotify';
import {useParams} from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {useEffect} from 'react';
import {useState} from 'react';
import { useSelector } from '../../../../store/reducer';
import {Redirect} from 'react-router-dom'

function EditClient() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken);
    const email = useSelector((state) => state.firebaseauth.currentUser.email)
    const [fidelioClient,setFidelioClient] = useState('');
    const [locations,setLocations] = useState([]);
    const animatedComponents = makeAnimated();
    const [preLocations,setPreLocations] = useState([]);
    let { id } = useParams();
    
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
            text: "La organización se editó satisfactoriamente :D",
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
                text: "No se pudo editar la organización :(",
                stack: window.stackBottomLeft,
                delay:3000
            });
    };

    const updateClient = async (newClient,token) => {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/clients/` + id, {
            method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token,
            },
      mode: 'cors',
      body: JSON.stringify(newClient),
        }).then(() =>  toggleShow()).then(()=> setGoBack(true)).catch(() => toggleApiError())
        }
        
    const handleSelect = (e) => {
      const arrayLT = []
      e.map((item) => {
        arrayLT.push(item.value)
      })
      setLocations(arrayLT)
    }

    const handlepreLocations = locationOptions.filter((item) => preLocations.includes(item.value));
    
    const optionsSelect = ( 
            <Select isMulti name="locationType" key={handlepreLocations} defaultValue={handlepreLocations}
                components={animatedComponents} onChange={handleSelect}
                options={locationOptions} className="basic-multi-select" classNamePrefix="select"/>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.formName.value;
        const repLegal = e.target.formRepLegal.value;
        const orgEmail = e.target.formEmail.value;
        const phone = e.target.formPhone.value;
        const address = e.target.formLegalAddress.value;
        const ruc = e.target.formRUC.value;
        const isActive = e.target[6].checked;
        const createdBy= email;
        if(locations.length === 0){
            const newClient = {
                name: name,
                legalRepresentative:repLegal,
                phone:phone,
                email:orgEmail,
                legalAddress:address,
                ruc:ruc,
                locationType:preLocations,
                createdBy:createdBy,
                isActive:isActive,
              }
              updateClient(newClient,reduxtoken);
        } else {
            const newClient = {
                name: name,
                legalRepresentative:repLegal,
                phone:phone,
                email:orgEmail,
                legalAddress:address,
                ruc:ruc,
                locationType:locations,
                createdBy:createdBy,
                isActive:isActive,
            }
            updateClient(newClient,reduxtoken);
        }
    }


        useEffect(() =>{
            fetch(`${process.env.REACT_APP_BASE_URL}/clients/`+ id , {
                method:'GET',
                headers:{
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + reduxtoken
            },
                mode:'cors',  
            })
            .then((response) =>  response.json())
            .then((apiData) =>{
                setFidelioClient(apiData);
                setPreLocations(apiData.locationType);
          }).catch((e) => console.log(e))
          }, [])
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
                                    <Card.Title as="h5">Editar Cliente</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Form onSubmit={handleSubmit} className='justify-content'>
                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="formName">
                                                        <Form.Label>Nombre</Form.Label>
                                                        <Form.Control type="text" placeholder="Nombre" defaultValue={fidelioClient.name} required/>
                                                    </Form.Group>
                                                </Form.Row>
                                                    <Form.Group controlId="formRepLegal" className=''>
                                                        <Form.Label>Representante Legal</Form.Label>
                                                        <Form.Control type='text' placeholder="Representante Legal" defaultValue={fidelioClient.legalRepresentative} required/>
                                                    </Form.Group>
        
                                                    <Form.Group controlId="formEmail" className=''>
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control type='email' placeholder="Email" defaultValue={fidelioClient.email} required/>
                                                    </Form.Group>
                                                    <Form.Group controlId="formPhone" className=''>
                                                        <Form.Label>Teléfono</Form.Label>
                                                        <Form.Control type='text' placeholder="Teléfono" defaultValue={fidelioClient.phone} required/>
                                                    </Form.Group>
                                               
                                                <Form.Group controlId="formLegalAddress" className=''>
                                                        <Form.Label>Dirección Legal</Form.Label>
                                                        <Form.Control type='text' placeholder="Dirección" defaultValue={fidelioClient.legalAddress} required/>
                                                    </Form.Group>
                                                
                                                <Form.Group controlId="formRUC" className=''>
                                                        <Form.Label>RUC</Form.Label>
                                                        <Form.Control type='text' placeholder="RUC" defaultValue={fidelioClient.ruc} required/>
                                                </Form.Group>
                                                <Form.Row>
                                                    <Form.Group controlId="checkActive" >
                                                        <Form.Label>Estado</Form.Label>
                                                        {fidelioClient.isActive ? <Form.Check type="switch" defaultChecked/> : 
                                                        <Form.Check type="switch" id="custom-switch" />}
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group className='mr-5'>
                                                        <Form.Label>Tipo de Locación</Form.Label>
                                                        {optionsSelect}
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

export default EditClient