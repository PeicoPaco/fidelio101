import * as React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useState} from 'react';
import { useSelector } from '../../../../store/reducer';
import {Redirect} from 'react-router-dom'


function DetailsFoodCourt() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken);

    const [foodcourt,setFoodCourt] = useState('');
    let { id } = useParams();

    

        useEffect(() =>{
            fetch(`${process.env.REACT_APP_BASE_URL}/location/`+ id , {
                method:'GET',
                headers:{
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + reduxtoken
            },
                mode:'cors',  
            })
            .then((response) =>  response.json())
            .then((apiData) =>{
              setFoodCourt(apiData)
          }).catch((e) => console.log(e))
          }, [])
          
          const [goBack,setGoBack]=useState(false);

          const Back = () =>{
            setGoBack(true)
          }


      if(goBack){
        return <Redirect to='/foodcourt'/>
        }
        

 return (
        <>
           <Row>
                <Col>
                    <Card className='m-3'>
                        <Card.Header>
                            <Card.Title as="h5">Detalles de Locación</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form className='justify-content'>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formName">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="text" placeholder="Nombre" defaultValue={foodcourt.name} readOnly/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className='justify-content-between'>
                                            <Form.Group controlId="formLat" className=''>
                                                <Form.Label>Latitud</Form.Label>
                                                <Form.Control type='text' placeholder="Latitud" defaultValue={foodcourt.latitud} readOnly/>
                                            </Form.Group>

                                            <Form.Group controlId="formLong" className=''>
                                                <Form.Label>Longitud</Form.Label>
                                                <Form.Control type='text' placeholder="Longitud" defaultValue={foodcourt.longitud} readOnly/>
                                            </Form.Group>
                                            <Form.Group controlId="formRadius" className=''>
                                                <Form.Label>Radio</Form.Label>
                                                <Form.Control type='text' placeholder="Radio" defaultValue={foodcourt.radio} readOnly/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className='justify-content'>
                                            <Form.Group as={Col} controlId="formAddress">
                                                <Form.Label>Dirección</Form.Label>
                                                <Form.Control type="text" placeholder="Dirección" defaultValue={foodcourt.address} readOnly/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                        <Form.Group className='mr-5' controlId='locationType'>
                                                <Form.Label>Tipo de Locación</Form.Label>
                                                <Form.Control size="md" type="text" defaultValue={foodcourt.locationType} className='mr-3' readOnly>
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

export default DetailsFoodCourt