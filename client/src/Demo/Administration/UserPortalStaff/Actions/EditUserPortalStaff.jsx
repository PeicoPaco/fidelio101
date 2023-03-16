import * as React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import PNotify from 'pnotify/dist/es/PNotify';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useState} from 'react';
import { useSelector } from '../../../../store/reducer';
import {Redirect} from 'react-router-dom'


function EditPortalStaff() {

    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken);

    const [staff,setStaff] = useState('');
    const [profiles,setProfiles]=useState([]);

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
            text: "El miembro de Portal se editó satisfactoriamente :D",
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
                text: "No se pudo editar al miembro de Portal :(",
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
        }).then(() =>  toggleShow()).then(()=> setGoBack(true)).catch(() => toggleApiError())
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const profilesChecked = e.target.formProfiles;
        const profilesCheckedArray = [];
        for (let i = 0; i < profilesChecked.length; i++) {
          if (profilesChecked[i].checked) {
            profilesCheckedArray.push(Object.values(profiles)[i]);
          }
        }
        if(profilesCheckedArray.length === 0){
            alert("Debe seleccionar al menos un perfil");
        }else{
            const newPortalStaff = {
                profile:profilesCheckedArray,
                clientId: staff.clientId,
            }
            updatePortalStaff(newPortalStaff,reduxtoken);
        }
      }


        useEffect(() =>{
            fetch(`${process.env.REACT_APP_BASE_URL}/staff/` + id , {
                method:'GET',
                headers:{
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + reduxtoken
            },
                mode:'cors',  
            })
            .then((response) =>  response.json())
            .then((apiData) =>{
              setStaff(apiData)
          }).catch((e) => console.log(e))
          }, [])

          useEffect(()=>{
            fetch(`${process.env.REACT_APP_BASE_URL}/portal/`, {
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
              return <Redirect to='/userportalstafflist'/>
          }       

 return (
        <>
           <Row>
                <Col>
                    <Card className='m-3'>
                        <Card.Header>
                            <Card.Title as="h5">Editar Perfiles del Usuario</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                <Form onSubmit={handleSubmit} className='justify-content'>
                                        <Form.Group controlId="formProfiles" className=''>
                                                <Form.Label>Profiles</Form.Label>
                                                {Object.keys(profiles).map((profile) => (
                                                    <Form.Check key={profile} type="checkbox" label={profiles[profile]} defaultChecked={
                                                        staff.profile && staff.profile.includes(profiles[profile])
                                                    }/>
                                                ))}
                                        </Form.Group>
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

export default EditPortalStaff