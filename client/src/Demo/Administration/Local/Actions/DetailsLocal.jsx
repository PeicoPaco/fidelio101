import * as React from 'react';
import { Row, Col, Card, Form, Button,NavLink } from 'react-bootstrap';
import PNotify from 'pnotify/dist/es/PNotify';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useState} from 'react';
import { useSelector } from '../../../../store/reducer';
import {Redirect} from 'react-router-dom'


function DetailsLocal() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken);
    const [bool,setBool]=useState(true)
    const [local,setLocal] = useState('');
    let { id } = useParams();
    
    

        useEffect(() =>{
            fetch(`${process.env.REACT_APP_BASE_URL}/local/` + id , {
                method:'GET',
                headers:{
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + reduxtoken
            },
                mode:'cors',  
            })
            .then((response) =>  response.json())
            .then((apiData) =>{
              setLocal(apiData)
          }).catch((e) => console.log(e))
          }, [])

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
                            <Card.Title as="h5">Detalles de Local</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form className='justify-content'>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formName">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="text" placeholder="Nombre" defaultValue={local.name} readOnly/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className='justify-content'>
                                            <Form.Group as={Col} controlId="formAddress">
                                                <Form.Label>Dirección</Form.Label>
                                                <Form.Control type="text" placeholder="Dirección" defaultValue={local.address} readOnly/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className='justify-content'>
                                                <Form.Group as={Col} controlId="formFoodCourt">
                                                    <Form.Label>Food Court Id</Form.Label>
                                                    <Form.Control size="md" type="text" className='mr-3' placeholder='Food Court Id' defaultValue={local.idFc} readOnly>
                                                        
                                                    </Form.Control>
                                                </Form.Group>
                                        </Form.Row>
                                        <Form.Row className=' d-flex justify-content-end'>
                                            <Button variant="outline-secondary" size='md' className='mr-2' onClick={Back}>Volver</Button>
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

export default DetailsLocal