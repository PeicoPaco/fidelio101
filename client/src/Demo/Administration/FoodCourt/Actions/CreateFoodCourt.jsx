import * as React from 'react';
import { Row, Col, Card, Form, Button} from 'react-bootstrap';
import Select from 'react-select';
import PNotify from 'pnotify/dist/es/PNotify';
import Datetime from 'react-datetime';
import { useSelector } from '../../../../store/reducer';
import {useState} from 'react'
import {Redirect} from 'react-router-dom'

function CreateFoodCourt() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken)
    const email = useSelector((state) => state.firebaseauth.currentUser.email)
    const [locations,setLocations] = useState();
    const locationOptions = [
        { value: 'FoodCourt', label: 'FoodCourt'},
        { value: 'Hotel', label: 'Hotel'},
        { value: 'Bar', label: 'Bar'},
        { value: 'Restaurant', label: 'Restaurant'},
    ];
    const [openTimeVar,setOpenTimeVar]=useState();
    const [closeTimeVar,setCloseTimeVar]=useState();

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
            text: "El Food Court se creó satisfactoriamente :D",
            stack: window.stackBottomLeft,
            delay:3000
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

    const postLocation = async (newFoodCourt,token) => {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/location/`, {
            method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token,
            },
      mode: 'cors',
      body: JSON.stringify(newFoodCourt),
        }).then(() =>  toggleShow())
          .then(() => setGoBack(true))
          .catch(() => toggleApiError())
    };

    const handleSelect = (e) => {
        setLocations(e.value)
    };

    const optionsSelect = ( 
        <Select name="locationType" className="basic-single" classNamePrefix="select" 
            onChange={handleSelect} options={locationOptions} required/>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.formName.value;
        const latitud = e.target.formLat.value;
        const longitud = e.target.formLong.value;
        const address = e.target.formAddress.value;
        const radio = e.target.formRadius.value;
        const opensAt = openTimeVar;
        const closesAt = closeTimeVar;
        const createdBy= email;
        const newFoodCourt = {
            name: name,
            address:address,
            latitud: latitud,
            longitud: longitud,
            createdBy:createdBy,
            locationType:locations,
            radio: radio,
            startsAt: opensAt,
            endsAt: closesAt,
            };
            console.log(opensAt)
            console.log(closesAt)
            postLocation(newFoodCourt,reduxtoken);
      }

      const [goBack,setGoBack]=useState(false);

      const Back = () =>{
        setGoBack(true)
      }

      if(goBack){
        return <Redirect to='/foodcourt'/>
        }


        function getHour(stringTime,setter) {
            // Split the string by spaces to get the time
            const time = stringTime.toString()

            console.log(time)

            const timeString= time.split(' ')[4]
            console.log(timeString)
          
            const [hours] = timeString.split(':');
          
            return setter(parseInt(hours, 10));
          }



 return (
        <>
           <Row>
                <Col>
                    <Card className='m-3'>
                        <Card.Header>
                            <Card.Title as="h5">Crear Nuevo Food Court</Card.Title>
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
                                        <Form.Row className='justify-content-between'>
                                            <Form.Group controlId="formLat" className=''>
                                                <Form.Label>Latitud</Form.Label>
                                                <Form.Control type='text' placeholder="Latitud" required/>
                                            </Form.Group>

                                            <Form.Group controlId="formLong" className=''>
                                                <Form.Label>Longitud</Form.Label>
                                                <Form.Control type='text' placeholder="Longitud" required/>
                                            </Form.Group>
                                            <Form.Group controlId="formRadius" className=''>
                                                <Form.Label>Radio</Form.Label>
                                                <Form.Control type='text' placeholder="Radio" required/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className='justify-content'>
                                            <Form.Group as={Col} controlId="formAddress">
                                                <Form.Label>Dirección</Form.Label>
                                                <Form.Control type="text" placeholder="Dirección" required/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group className='mr-5'>
                                                <Form.Label>Tipo de Locación</Form.Label>
                                                    {optionsSelect}
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group controlId="formOpenTime" className='mr-3 col-4'>
                                                <Form.Label>Hora de Apertura</Form.Label>
                                                <Datetime dateFormat={false} onClose={(value) => getHour(value._d,setOpenTimeVar)} inputProps={{ placeholder: 'Select Time' }}/>
                                            </Form.Group>
                                            <Form.Group controlId="formCloseTime" className='mr-3 col-4'>
                                                <Form.Label>Hora de Cierre</Form.Label>
                                                <Datetime dateFormat={false} onClose={(value) => getHour(value._d,setCloseTimeVar)} inputProps={{ placeholder: 'Select Time' }}/>
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

export default CreateFoodCourt