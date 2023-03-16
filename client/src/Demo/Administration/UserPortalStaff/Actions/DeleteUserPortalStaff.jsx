import * as React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import PNotify from 'pnotify/dist/es/PNotify';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useState} from 'react';
import { useSelector } from '../../../../store/reducer';
import {Redirect} from 'react-router-dom'
import { auth } from '../../../../fb';
import {deleteUser} from '@firebase/auth'


function DeleteUserPortalStaff() {
  
    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken);
    let { id } = useParams();
    let { email }= useParams();
    
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
            text: "El miembro de Portal se eliminó satisfactoriamente :D",
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
                text: "No se pudo eliminar al miembro de Portal :(",
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
        }).then(() =>  toggleShow()).then(()=> setGoBack(true)).then(() => deleteUser(email)).catch(() => toggleApiError())
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPortalStaff = {
          profile:[]
        }
        updatePortalStaff(newPortalStaff,reduxtoken);
      }

          const [goBack,setGoBack]=useState(false);

          const Back = () =>{
            setGoBack(true)
          }


          if(goBack){
              return <Redirect to='/userportalstafflist'/>
          }       

 return (
        <>
           <Row>
                <Col>
                    <Card className='m-3'>
                        <Card.Header>
                            <Card.Title as="h5">Eliminar Perfiles del Usuario</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                <Form onSubmit={handleSubmit} className='justify-content'>
                                        <Form.Row className=' d-flex justify-content-end'>
                                            <Button variant="outline-secondary" size='md' onClick={Back} className='mr-3'>Volver</Button>
                                            <Button type="submit" size='md' variant='danger'>Eliminar</Button>
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

export default DeleteUserPortalStaff