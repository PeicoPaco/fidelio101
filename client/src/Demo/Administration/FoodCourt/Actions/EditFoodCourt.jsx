import * as React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import PNotify from 'pnotify/dist/es/PNotify';
import {useParams} from 'react-router-dom';
import Select from 'react-select';
import {useEffect} from 'react';
import {useState} from 'react';
import { useSelector } from '../../../../store/reducer';
import {Redirect} from 'react-router-dom'


function EditFoodCourt() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken);

    const [foodcourt,setFoodCourt] = useState('');
    const [locations,setLocations] = useState();
    let { id } = useParams();

    const locationOptions = [
        { value: 'FoodCourt', label: 'FoodCourt'},
        { value: 'Hotel', label: 'Hotel'},
        { value: 'Bar', label: 'Bar'},
        { value: 'Restaurant', label: 'Restaurant'},
    ];
    
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
            text: "El Food Court se editó satisfactoriamente :D",
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
                text: "No se pudo completar la creación del Food Court :(",
                stack: window.stackBottomLeft,
                delay:3000
            });
    };

    const updateFoodCourt = async (newFoodCourt,token) => {
        await fetch(`${process.env.REACT_APP_BASE_URL}/location/` + id, {
          method: 'PUT',
          headers: {
              "Content-Type": "application/json",
              Authorization: 'Bearer ' + token,
                  },
          mode: 'cors',
          body: JSON.stringify(newFoodCourt),
        }).then(() =>  toggleShow()).then(()=>setGoBack(true)).catch(() => toggleApiError())
    }

    const handleSelect = (e) => {
        setLocations(e.value)
    }

    const handlepreLocations = locationOptions.find(option => option.value === foodcourt.locationType);

    const optionsSelect = ( 
        <Select name="locationType" className="basic-single" classNamePrefix="select" 
            defaultValue={handlepreLocations} key={handlepreLocations}
            onChange={handleSelect} options={locationOptions}/>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.formName.value;
        const latitud = e.target.formLat.value;
        const longitud = e.target.formLong.value;
        const radio = e.target.formRadius.value;
        const address = e.target.formAddress.value;
        const isActive = e.target[5].checked;
        if(locations === undefined){
            const newFoodCourt = {
                name: name,
                address:address,
                latitud: latitud,
                longitud: longitud,
                radio: radio,
                locationType: foodcourt.locationType,
                isActive:isActive,
              }
              updateFoodCourt(newFoodCourt,reduxtoken);
        } else{
            const newFoodCourt = {
                name: name,
                address:address,
                latitud: latitud,
                longitud: longitud,
                radio: radio,
                locationType: locations,
                isActive:isActive,
              }
            updateFoodCourt(newFoodCourt,reduxtoken);
        }
      }

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
                            <Card.Title as="h5">Editar Locacion</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form onSubmit={handleSubmit} className='justify-content'>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formName">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="text" placeholder="Nombre" defaultValue={foodcourt.name} required/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className='justify-content-between'>
                                            <Form.Group controlId="formLat" className=''>
                                                <Form.Label>Latitud</Form.Label>
                                                <Form.Control type='text' placeholder="Latitud" defaultValue={foodcourt.latitud} required/>
                                            </Form.Group>
                                            <Form.Group controlId="formLong" className=''>
                                                <Form.Label>Longitud</Form.Label>
                                                <Form.Control type='text' placeholder="Longitud" defaultValue={foodcourt.longitud} required/>
                                            </Form.Group>
                                            <Form.Group controlId="formRadius" className=''>
                                                <Form.Label>Radio</Form.Label>
                                                <Form.Control type='text' placeholder="Radio" defaultValue={foodcourt.radio} required/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className='justify-content'>
                                            <Form.Group as={Col} controlId="formAddress">
                                                <Form.Label>Dirección</Form.Label>
                                                <Form.Control type="text" placeholder="Dirección" defaultValue={foodcourt.address} required/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group controlId="checkActive" >
                                                <Form.Label>Estado</Form.Label>
                                                {foodcourt.isActive ? <Form.Check type="switch" defaultChecked/> : 
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

export default EditFoodCourt