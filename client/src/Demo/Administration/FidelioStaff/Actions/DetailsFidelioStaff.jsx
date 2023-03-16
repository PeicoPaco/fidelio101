import * as React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import PNotify from 'pnotify/dist/es/PNotify';
import {useParams} from 'react-router-dom';
import Select from 'react-select';
import {useEffect} from 'react';
import {useState} from 'react';
import { useSelector } from '../../../../store/reducer';
import {Redirect} from 'react-router-dom'


function DetailsFidelioStaff() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken);

    const [fideliostaff,setFidelioStaff] = useState('');
    let { id } = useParams();
    const [preTeam,setPreTeam]=useState([]);

    const teams= [
        {label: "Foodcourt" , value: "Foodcourt"},
        {label: "Restaurante" , value: "Restaurante"},
        {label: "Bar" , value: "Bar"},
        {label: "Hotel", value: "Hotel"}
    ]

        const handlepreLocations = teams.filter((item) => preTeam.includes(item.value));

        const optionsTeam = (
            <Select isMulti name="team" key={handlepreLocations} defaultValue={handlepreLocations}
                    options={teams} className="basic-multi-select" classNamePrefix="select" isDisabled/>
        );


        useEffect(() =>{
            fetch(`${process.env.REACT_APP_BASE_URL}/staffFidelio/` + id , {
                method:'GET',
                headers:{
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + reduxtoken
            },
                mode:'cors',  
            })
            .then((response) =>  response.json())
            .then((apiData) =>{
              setFidelioStaff(apiData)
              setPreTeam(apiData.fidelioTeam)
          }).catch((e) => console.log(e))
          }, [])
          const [goBack,setGoBack]=useState(false);

          const Back = () =>{
            setGoBack(true)
          }

            if(goBack){
                return <Redirect to='/fideliostaff'/>
            }
        

 return (
        <>
           <Row>
                <Col>
                    <Card className='m-3'>
                        <Card.Header>
                            <Card.Title as="h5">Detalles de Staff de Fidelio</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                <Form className='justify-content'>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formName">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="text" placeholder="Nombre" defaultValue={fideliostaff.name} readOnly/>
                                            </Form.Group>
                                        </Form.Row>
                                            <Form.Group controlId="formDNI" className=''>
                                                <Form.Label>DNI/CE</Form.Label>
                                                <Form.Control type='text' placeholder="DNI/CE" defaultValue={fideliostaff.dni} disabled/>
                                            </Form.Group>

                                            <Form.Group controlId="formEmail" className=''>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type='email' placeholder="Email" defaultValue={fideliostaff.email} readOnly/>
                                            </Form.Group>
                                            <Form.Group className='mr-3'>
                                                <Form.Label>Tipo de Locacion</Form.Label>
                                                    {optionsTeam}
                                                </Form.Group>
                                        <Form.Row className='justify-content'>
                                            <Form.Group as={Col} controlId="formRole">
                                                <Form.Label>Rol</Form.Label>
                                                <Form.Control size="md" type="text" className='mr-3' defaultValue={fideliostaff.role} placeholder='Rol' disabled>
                                                </Form.Control>
                                            </Form.Group>
                                        </Form.Row>
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

export default DetailsFidelioStaff