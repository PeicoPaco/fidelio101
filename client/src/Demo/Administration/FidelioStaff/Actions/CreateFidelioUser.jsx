import * as React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import PNotify from 'pnotify/dist/es/PNotify';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useState} from 'react';
import { useSelector } from '../../../../store/reducer';
import {Redirect} from 'react-router-dom';
import { auth } from '../../../../fb';
import { sendPasswordResetEmail} from '@firebase/auth'



function EditFidelioStaff() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken);

    const [fideliostaff,setFidelioStaff] = useState('');
    const [profiles,setProfiles]=useState([]);

    let { id } = useParams();
    
    const toggleShow = () => {
        if (typeof window.stackBottomRight === 'undefined') {
            window.stackBottomRight = {
                dir1: 'up',
                dir2: 'left',
                firstpos1: 25,
                firstpos2: 25
            };
        }
        PNotify.success({
            title: 'Completado',
            text: "El miembro de Fidelio se editó satisfactoriamente :D",
            stack: window.stackBottomRight,
            delay: 3000
        });
    };
    const toggleApiError = () => {
            if (typeof window.stackBottomRight === 'undefined') {
                window.stackBottomRight = {
                    dir1: 'up',
                    dir2: 'left',
                    firstpos1: 25,
                    firstpos2: 25
                };
            }
            PNotify.error({
                title: 'Error',
                text: "No se pudo eliminar al miembro de Fidelio :(",
                stack: window.stackBottomRight,
                delay:3000
            });
    };

    const updateFidelioStaff = async (newFidelioStaff,token) => {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/staffFidelio/` + newFidelioStaff.dni, {
            method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token,
            },
      mode: 'cors',
      body: JSON.stringify(newFidelioStaff),
        }).then(() =>  toggleShow()).then(()=> setGoBack(true)).catch(() => toggleApiError())
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        const dni = e.target.formDNI.value;
        const staffemail = e.target.formEmail.value;
        const profilesChecked = e.target.formProfiles;
        const profilesCheckedArray = [];
        for (let i = 0; i < profilesChecked.length; i++) {
          if (profilesChecked[i].checked) {
            profilesCheckedArray.push(Object.values(profiles)[i]);
          }
        }
        if (profilesCheckedArray.length > 0) {
            const newFidelioStaff = {
            dni:dni,
            email:staffemail,
            profile:profilesCheckedArray
            }
            updateFidelioStaff(newFidelioStaff,reduxtoken).then(() => sendPasswordResetEmail(auth, newFidelioStaff.email));
        } else {
            alert('Debe seleccionar al menos un perfil');
        }
    }


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
                            <Card.Title as="h5">Editar User Consola</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                <Form onSubmit={handleSubmit} className='justify-content'>
                                            <Form.Group controlId="formDNI" className=''>
                                                <Form.Label>DNI/CE</Form.Label>
                                                <Form.Control type='text' placeholder="DNI/CE" defaultValue={fideliostaff.dni} readOnly />
                                            </Form.Group>
                                            <Form.Group controlId="formEmail" className=''>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type='email' placeholder="Email" defaultValue={fideliostaff.email} readOnly/>
                                            </Form.Group>
                                        <Form.Group controlId="formProfiles" className=''>
                                                <Form.Label>Profiles</Form.Label>
                                                {/* {fideliostaff.profile && fideliostaff.profile.map((profile) => (
                                                    <Form.Check type="checkbox" label={profile} defaultChecked/>
                                                ))} */}
                                                {Object.keys(profiles).map((profile) => (
                                                    <Form.Check key={profile} type="checkbox" label={profiles[profile]} defaultChecked={
                                                        fideliostaff.profile && fideliostaff.profile.includes(profiles[profile])
                                                    }/>
                                                ))}
                                        </Form.Group>
                                        <Form.Row className=' d-flex justify-content-end'>
                                            <Button variant="outline-secondary" size='md' onClick={Back} className='mr-3'>Volver</Button>
                                            <Button type="submit" size='md' variant='success'>Dar acceso</Button>
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

export default EditFidelioStaff