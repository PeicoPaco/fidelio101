import * as React from 'react';
import * as actionTypes from '../../store/actions'
import { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Dropdown} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import DEMO from '../../store/constant';
import avatar5 from '../../assets/images/user/avatar-5.jpg';
import { useSelector } from '../../store/reducer';


const SamplePage = () => {

    const dispatch = useDispatch();
    const firebaseauth = useSelector((state) => state.firebaseauth);
    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken);
    const [sessionusser, setSessionUser] = useState(null)
    const dataFetchedRef = useRef(false)
    const setReduxSessionuser = (user) => dispatch({type: actionTypes.SET_USER, user: user })
    

    useEffect(() =>{
        if(dataFetchedRef.current) return;
            dataFetchedRef.current = true;
        fetch(`${process.env.REACT_APP_BASE_URL}/staffFidelio/`+ firebaseauth.currentUser.email , {
            method:'GET',
            headers:{
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + reduxtoken
        },
            mode:'cors',  
        })
        .then((response) =>  response.json())
        .then((apiData) =>{
          setSessionUser(apiData)
          setReduxSessionuser(apiData)
      }).catch((e) => console.log(e))
      }, [dataFetchedRef])

    useEffect(() =>{
        fetch(`${process.env.REACT_APP_BASE_URL}/staffFidelio/login/`+ firebaseauth.currentUser.email , {
            method:'GET',
            headers:{
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + reduxtoken
            },
            mode:'cors',
        }).catch((e) => console.log(e))
    },[])
      
    return (<>
            <div className="user-profile user-card mb-4">
                <Card.Header className="border-0 p-0 pb-0 pt-10">
                    <div className="cover-img-block">
                        <div className="overlay"/>
                        <div className="change-cover">
                            <Dropdown>
                                <Dropdown.Toggle variant="link" id="dropdown-basic" className="drp-icon text-white">
                                    <i className="feather icon-camera"/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href={DEMO.BLANK_LINK}>
                                        <i className="feather icon-upload-cloud mr-2"/>
                                        upload new
                                    </Dropdown.Item>
                                    <Dropdown.Item href={DEMO.BLANK_LINK}>
                                        <i className="feather icon-image mr-2"/>
                                        from photos
                                    </Dropdown.Item>
                                    <Dropdown.Item href={DEMO.BLANK_LINK}>
                                        <i className="feather icon-film mr-2"/>
                                        upload video
                                    </Dropdown.Item>
                                    <Dropdown.Item href={DEMO.BLANK_LINK}>
                                        <i className="feather icon-trash-2 mr-2"/>
                                        remove
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </Card.Header>
                { sessionusser &&
                <Card.Body className="py-0">
                    <div className="user-about-block m-0">
                        <Row>
                            <Col md={4} className="text-center mt-n5">
                                <div className="change-profile text-center">
                                    <Dropdown className="w-auto d-inline-block">
                                        <Dropdown.Toggle as="a" variant="link" id="dropdown-basic">
                                            <div className="profile-dp">
                                                <div className="position-relative d-inline-block">
                                                    <img className="img-radius img-fluid wid-100" src={avatar5} alt="User"/>
                                                </div>
                                                <div className="overlay">
                                                    <span>change</span>
                                                </div>
                                            </div>
                                            <div className="certificated-badge">
                                                <i className="fas fa-certificate text-c-blue bg-icon"/>
                                                <i className="fas fa-check front-icon text-white"/>
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href={DEMO.BLANK_LINK}>
                                                <i className="feather icon-upload-cloud mr-2"/>
                                                upload new
                                            </Dropdown.Item>
                                            <Dropdown.Item href={DEMO.BLANK_LINK}>
                                                <i className="feather icon-image mr-2"/>
                                                from photos
                                            </Dropdown.Item>
                                            <Dropdown.Item href={DEMO.BLANK_LINK}>
                                                <i className="feather icon-film mr-2"/>
                                                upload video
                                            </Dropdown.Item>
                                            <Dropdown.Item href={DEMO.BLANK_LINK}>
                                                <i className="feather icon-trash-2 mr-2"/>
                                                remove
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <h5 className="mb-1">{sessionusser.name}</h5>
                                <p className="mb-2 text-muted">{sessionusser.role}</p>
                            </Col>
                            <Col md={8} className="mt-md-4">
                                <Row>
                                    <Col>
                                        <div className="media">
                                            <i className="feather icon-map-pin mr-2 mt-1 f-18"/>
                                            <div className="media-body">
                                                {sessionusser.profile}
                                            </div>
                                        </div>
                                        <div className="clearfix"/>
                                        <a href="mailto:demo@domain.com" className="mb-1 text-muted d-flex align-items-end text-h-primary">
                                            <i className="feather icon-mail mr-2 f-18"/>
                                            {firebaseauth.currentUser.email}
                                        </a>
                                        <div className="clearfix"/>
                                        <a href={DEMO.BLANK_LINK} className="mb-1 text-muted d-flex align-items-end text-h-primary">
                                            <i className="feather icon-phone mr-2 f-18"/>
                                            {sessionusser.dni}
                                        </a>
                                    </Col>
                                    <Col>
                                        <div className="media">
                                            <i className="feather icon-map-pin mr-2 mt-1 f-18"/>
                                            <div className="media-body">
                                                <p className="mb-0 text-muted">{sessionusser.idLocal}</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    </Card.Body>
                }
            </div>
        </>);
};
export default SamplePage;
