import * as React from 'react';
import { Row, Col, Card, Form, Button,NavLink } from 'react-bootstrap';
import PNotify from 'pnotify/dist/es/PNotify';
import {useParams} from 'react-router-dom';
import Select from 'react-select';
import {useEffect} from 'react';
import {useState} from 'react';
import { useSelector } from '../../../../store/reducer';
import {Redirect} from 'react-router-dom'


function EditLocal() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken);
    const email = useSelector((state) => state.firebaseauth.currentUser.email)
    const [location,setLocation]=useState([])
    const [selectLocation,setSelectLocation]=useState([])
    const [bool,setBool]=useState(true)
    const [local,setLocal] = useState('');
    let { id } = useParams();
    
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
            text: "El Local se editó satisfactoriamente :D",
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
                text: "No se pudo completar la creación del Local :(",
                stack: window.stackBottomLeft,
                delay:3000
            });
    };

    const updateLocal = async (newLocal,token) => {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/local/` + id, {
            method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token,
            },
      mode: 'cors',
      body: JSON.stringify(newLocal),
        }).then(() =>  toggleShow(),setGoBack(true)).catch(() => toggleApiError())
    };

    const arrayLocation = [];
    location.map((item) => {
      arrayLocation.push({value:item.name,label:item.name})
    });
    const locationOptions = arrayLocation;

    const handleSelect = (e) => {
        setSelectLocation(e.value)
    }

    const handlepreLocations = locationOptions.find(option => option.value === local.nameLocation);

    const optionsSelect = (
        <Select name="locationType" className="basic-single" classNamePrefix="select" 
            defaultValue={handlepreLocations} key={handlepreLocations}
            onChange={handleSelect} options={locationOptions}/>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.formName.value;
        const address= e.target.formAddress.value;
        const isActive = e.target[2].checked;
        const createdBy= email;
        if (selectLocation.length === 0){
            const newLocal = {
                name: name,
                address:address,
                nameLocation:local.nameLocation,
                createdBy:createdBy,
                isActive:isActive,
            }
            updateLocal(newLocal,reduxtoken);
        } else {
            const newLocal = {
                name: name,
                address:address,
                nameLocation:selectLocation,
                createdBy:createdBy,
                isActive:isActive,
            }
            updateLocal(newLocal,reduxtoken);
        }
    }

    useEffect(()=>{
        
        fetch(`${process.env.REACT_APP_BASE_URL}/location`, {
        headers:{
            "Content-Type": "application/json",   
            Authorization: 'Bearer ' + reduxtoken,
        }
        })
            .then((response) =>  response.json())
            .then((apiData) =>{
                setLocation(apiData);
                setBool(null);
            })
            .catch((e) => console.log(e))

    },[bool])
    

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
                            <Card.Title as="h5">Editar Local</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form onSubmit={handleSubmit} className='justify-content'>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formName">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="text" placeholder="Nombre" defaultValue={local.name} required/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className='justify-content'>
                                            <Form.Group as={Col} controlId="formAddress">
                                                <Form.Label>Dirección</Form.Label>
                                                <Form.Control type="text" placeholder="Dirección" defaultValue={local.address} required/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group controlId="checkActive" >
                                                <Form.Label>Estado</Form.Label>
                                                {local.isActive ? <Form.Check type="switch" defaultChecked/> : 
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
                                            <Button variant="outline-secondary" size='md' className='mr-2' onClick={Back}>Volver</Button>
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

export default EditLocal