import * as React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import PNotify from 'pnotify/dist/es/PNotify';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useState} from 'react';
import { useSelector } from '../../../../store/reducer';
import {Redirect} from 'react-router-dom'


function DetailsUserConsola() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken);

    const [fideliostaff,setFidelioStaff] = useState('');
    const [profiles,setProfiles]=useState([]);

    let { id } = useParams();
    let { email }= useParams();
    

        useEffect(() =>{
            fetch(`${process.env.REACT_APP_BASE_URL}/staffFidelio/` + email , {
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
          }).catch((e) => console.log(e))
          }, [])

          useEffect(()=>{
            fetch(`${process.env.REACT_APP_BASE_URL}/consola/`, {
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

          const [goBack,setGoBack]=useState(false);

          const Back = () =>{
            setGoBack(true)
          }


          if(goBack){
              return <Redirect to='/userconsolalist'/>
          }       

 return (
        <>
           <Row>
                <Col>
                    <Card className='m-3'>
                        <Card.Header>
                            <Card.Title as="h5">Detalles de Perfiles del Usuario</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                <Form className='justify-content'>
                                        <Form.Group controlId="formProfiles" className=''>
                                                <Form.Label>Profiles</Form.Label>
                                                 {fideliostaff.profile && fideliostaff.profile.map((profile) => (
                                                    <Form.Check type="checkbox" label={profile} defaultChecked/>
                                                ))} 
                                                {/* {Object.keys(profiles).map((profile) => (
                                                    <Form.Control></Form.Control>
                                                ))} */}
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

export default DetailsUserConsola