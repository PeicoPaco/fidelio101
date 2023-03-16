import * as React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'; 
import PNotify from 'pnotify/dist/es/PNotify';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useState} from 'react';
import { useSelector } from '../../../../store/reducer';
import {Redirect} from 'react-router-dom'


function EditFidelioStaff() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken);
    const [fideliostaff,setFidelioStaff] = useState('');
    let { id } = useParams();
    const animatedComponents = makeAnimated();
    const [profile,setProfile]=useState([]);
    const [selectTeam,setSelectTeam]=useState([]);
    const [preTeam,setPreTeam]=useState([]);
    const [preRol,setPreRol]=useState([]);
    
    const teams= [
        {label: "Foodcourt" , value: "Foodcourt"},
        {label: "Restaurante" , value: "Restaurante"},
        {label: "Bar" , value: "Bar"},
        {label: "Hotel", value: "Hotel"}
    ]

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
            text: "El miembro de Fidelio se editó satisfactoriamente :D",
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
                text: "No se pudo editar al miembro de Fidelio :(",
                stack: window.stackBottomLeft,
                delay:3000
            });
    };

    const updateFidelioStaff = async (newFidelioStaff,token) => {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/staffFidelio/` + fideliostaff.dni, {
            method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token,
            },
      mode: 'cors',
      body: JSON.stringify(newFidelioStaff),
        }).then((response) =>  {
            response.json()
                if (response.ok) {
                    toggleShow();
                    setGoBack(true);
                } else {
                    response.json().then((error) => {
                        console.log(error);
                        handleError(error.code)
                    })
                }
            })

        }

        const handleError = async (codeError) => {
            switch(codeError) {
                case 6: 
                toggleApiError('DNI ya está en uso')
                break;
                case 'BF-1':
                toggleApiError('Email ya está en uso');
                break;
                case 'BF-2':
                toggleApiError("No se ha encontrado Staff Fidelio");
                break;
                case 'BF-3':
                toggleApiError("Guardado con exito. Pero correo esta en uso");
                break;
                case 'BF-5':
                toggleApiError("Guardado con exito");
                break;
                default:
                toggleApiError('Ocurrió un error inesperado')
                break;
            }
        } 

        useEffect(()=>{
            fetch(`${process.env.REACT_APP_BASE_URL}/consola`, {
              headers:{
                "Content-Type": "application/json",   
                Authorization: 'Bearer ' + reduxtoken,
              }
            })
                .then((response) =>  response.json())
                .then((apiData) =>{
                    setProfile(apiData)
                  })
        },[])

    const handleSelect = (e) => {
        const arrayLT = []
        e.map((item) => {
            arrayLT.push(item.value)
        })
        setSelectTeam(arrayLT);
    }

    const handlepreLocations = teams.filter((item) => preTeam.includes(item.value));

    const optionsTeam = (
        <Select isMulti name="team" key={handlepreLocations} defaultValue={handlepreLocations}
                components={animatedComponents} onChange={handleSelect}
                options={teams} className="basic-multi-select" classNamePrefix="select" required/>
    );

    const arrayProfile = [
        {label: profile.profile1, value: profile.profile1},
        {label: profile.profile2, value: profile.profile2},
        {label: profile.profile3, value: profile.profile3}
    ];

    const handleSelectRol = (e) => {
        setPreRol(e.value);
    }

    const handlePreRol = arrayProfile.filter((item) => preRol.includes(item.value));

    const optionsRole = (
        <Select name="profile" key={handlePreRol} defaultValue={handlePreRol}
                onChange={handleSelectRol} options={arrayProfile} 
                className="basic-multi-select" classNamePrefix="select" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.formName.value;
        const lastName = e.target.formLastName.value;
        const email = e.target.formEmail.value;
        const isActive = e.target[4].checked;
        const newFidelioStaff = {
          name: name,
          lastName:lastName,
          fidelioTeam:selectTeam,
          role:preRol,
          isActive:isActive,
          email:email,
        }
        updateFidelioStaff(newFidelioStaff,reduxtoken);
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
              setPreTeam(apiData.fidelioTeam)
                setPreRol(apiData.role)
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
                            <Card.Title as="h5">Editar Staff de Fidelio</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                <Form onSubmit={handleSubmit} className='justify-content'>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formName">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="text" placeholder="Nombre" defaultValue={fideliostaff.name} required/>
                                            </Form.Group>
                                        </Form.Row>
                                            <Form.Group controlId="formLastName" className=''>
                                                <Form.Label>Apellido</Form.Label>
                                                <Form.Control type='text' placeholder="Apellidos" defaultValue={fideliostaff.lastName} required/>
                                            </Form.Group>
                                            <Form.Group controlId="formDNI" className=''>
                                                <Form.Label>DNI/CE</Form.Label>
                                                <Form.Control type='text' placeholder="DNI/CE" defaultValue={fideliostaff.dni} disabled required/>
                                            </Form.Group>
                                            <Form.Group controlId="formEmail" className=''>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type='email' placeholder="Email" defaultValue={fideliostaff.email} required/>
                                            </Form.Group>
                                            <Form.Row>
                                                <Form.Group controlId="checkActive" >
                                                    <Form.Label>Estado</Form.Label>
                                                        {fideliostaff.isActive ? <Form.Check type="switch" defaultChecked/> : 
                                                        <Form.Check type="switch" id="custom-switch" />}
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group className='mr-3'>
                                                    <Form.Label>Tipo de Locacion</Form.Label>
                                                        {optionsTeam}
                                                </Form.Group>
                                                <Form.Group className='mx-3'>
                                                    <Form.Label>Profile</Form.Label>
                                                        {optionsRole}
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

export default EditFidelioStaff