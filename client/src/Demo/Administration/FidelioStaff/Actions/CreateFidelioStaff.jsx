import * as React from 'react';
import { Row, Col, Card, Form, Button} from 'react-bootstrap';
import PNotify from 'pnotify/dist/es/PNotify';
import { useSelector } from '../../../../store/reducer';
import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {useEffect} from 'react'
import Select from 'react-select';

function CreateFidelioStaff() {


    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken)
    const email = useSelector((state) => state.firebaseauth.currentUser.email)
    const [messageError, setMessageError] = useState('');
    const [profiles,setProfiles]=useState([]);
    const teams= [
        {label: "Foodcourt" , value: "Foodcourt"},
        {label: "Restaurante" , value: "restaurante"},
        {label: "Bar" , value: "bar"},
        {label: "Hotel", value: "hotel"}
    ]
    const [selectedTeam,setSelectedTeam]=useState();
    
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
            text: "El miembro de Fidelio se creó satisfactoriamente :D",
            stack: window.stackBottomLeft,
            delay:3000
        });
    };
    const toggleApiError = (messageError) => {
        console.log(messageError)
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
                text: messageError,
                stack: window.stackBottomLeft,
                delay:3000
            });
    };

    const postFidelioStaff = async (newFidelioStaff,token) => {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/staffFidelio/`, {
            method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token,
            },
      mode: 'cors',
      body: JSON.stringify(newFidelioStaff),
        }).then((response) =>  {
            if (response.ok) {
                toggleShow()
                setGoBack(true)
            } else {
                response.json().then((error) => {
                    handleError(error.code)
                })
            }
        })
        }

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

    const handleError = async (codeError) => {
        switch(codeError) {
            case 6: 
            toggleApiError('DNI ya está en uso')
            break;
            case 'BF-1':
            toggleApiError('Email ya está en uso');
            break;
            default:
            toggleApiError('Ocurrió un error inesperado')
            break;
        }
    }    
    const handleSelect = (e) => {
        const STeam=[]
        e.map((item) =>{
            STeam.push(item.value)
        })
        setSelectedTeam(STeam)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.formName.value;
        const lastName = e.target.formLastName.value;
        const dni = e.target.formDNI.value;
        const staffemail = e.target.formEmail.value;
        const team = selectedTeam;
        const rol = e.target.formRole.value;
        const createdBy = email;
        const newFidelioStaff = {
          name: name,
          lastName:lastName,
          dni:dni,
          email:staffemail,
          fidelioTeam:team,
          role:rol,
          createdBy:createdBy,
        }
        if(dni.length==8){
            postFidelioStaff(newFidelioStaff,reduxtoken);
        }else{
            toggleApiError("El dni debe tener 8 digitos")
        }
        
      }
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
                            <Card.Title as="h5">Crear Nuevo Staff de Fidelio</Card.Title>
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
                                            <Form.Group controlId="formLastName">
                                                <Form.Label>Apellidos</Form.Label>
                                                <Form.Control type="text" placeholder="Apellidos" required/>
                                            </Form.Group>
                                            <Form.Group controlId="formDNI" className=''>
                                                <Form.Label>DNI/CE</Form.Label>
                                                <Form.Control type='number' placeholder="DNI/CE" required/>
                                            </Form.Group>
                                            <Form.Group controlId="formEmail" className=''>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type='email' placeholder="Email" required/>
                                            </Form.Group>
                                            <Form.Group controlId="formTeam" className=''>
                                                <Form.Label>Team</Form.Label>
                                                <Select onChange={handleSelect} options={teams} isMulti name="team" className="basic-multi-select" classNamePrefix="select" isSearchable/>
                                            </Form.Group>
                                        <Form.Row className='justify-content'>
                                            <Form.Group as={Col} controlId="formRole">
                                                <Form.Label>Rol</Form.Label>
                                                <Form.Control size="md" as="select" className='mr-3' placeholder='Rol' required>
                                                    <option></option>
                                                    <option>{profiles.profile1}</option>
                                                    <option>{profiles.profile2}</option>
                                                    <option>{profiles.profile3}</option>
                                                </Form.Control>
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

export default CreateFidelioStaff