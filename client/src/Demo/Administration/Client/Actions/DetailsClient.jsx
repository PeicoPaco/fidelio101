import * as React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import PNotify from 'pnotify/dist/es/PNotify';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useState} from 'react';
import { useSelector } from '../../../../store/reducer';
import {Redirect} from 'react-router-dom'


function DetailsClient() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken);
    const [fidelioOrg,setFidelioOrg] = useState('');
    let { id } = useParams();
    

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
                setFidelioOrg(apiData)
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
                                    <Card.Title as="h5">Detalles de Cliente</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Form className='justify-content'>
                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="formName">
                                                        <Form.Label>Nombre</Form.Label>
                                                        <Form.Control type="text" placeholder="Nombre" defaultValue={fidelioOrg.name} readOnly/>
                                                    </Form.Group>
                                                </Form.Row>
                                                    <Form.Group controlId="formRepLegal" className=''>
                                                        <Form.Label>Representante Legal</Form.Label>
                                                        <Form.Control type='text' placeholder="Representante Legal" defaultValue={fidelioOrg.legalRepresentative} readOnly/>
                                                    </Form.Group>
        
                                                    <Form.Group controlId="formEmail" className=''>
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control type='email' placeholder="Email" defaultValue={fidelioOrg.email} readOnly/>
                                                    </Form.Group>
                                                    <Form.Group controlId="formPhone" className=''>
                                                        <Form.Label>Teléfono</Form.Label>
                                                        <Form.Control type='text' placeholder="Teléfono" defaultValue={fidelioOrg.phone} readOnly/>
                                                    </Form.Group>
                                               
                                                <Form.Group controlId="formLegalAddress" className=''>
                                                        <Form.Label>Dirección Legal</Form.Label>
                                                        <Form.Control type='text' placeholder="Dirección" defaultValue={fidelioOrg.legalAddress} readOnly/>
                                                    </Form.Group>
                                                
                                                <Form.Group controlId="formRUC" className=''>
                                                        <Form.Label>RUC</Form.Label>
                                                        <Form.Control type='text' placeholder="RUC" defaultValue={fidelioOrg.ruc} readOnly/>
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

export default DetailsClient