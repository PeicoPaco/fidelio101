import * as React from 'react';
import * as actionTypes from '../../store/actions';
import { NavLink, Redirect, Route} from 'react-router-dom';
import './../../assets/scss/style.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../store/reducer';
import Breadcrumb from '../../App/layout/AdminLayout/Breadcrumb';
import logo from '../../assets/images/logo-dark.png';
import { useState, useEffect } from 'react';
import { auth } from '../../fb';
import { signInWithEmailAndPassword, onAuthStateChanged } from "@firebase/auth";
import Config from '../../config';

const Login = () => {


    const dispatch = useDispatch();
    const firebaseauth = useSelector((state) => state.firebaseauth)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginerror, setlogInError] = useState(false);
    const [noLogin, setNoLogin] = useState('');

    const setCurrentUser = (currentUser) => dispatch({type: actionTypes.LOG_IN, currentUser: currentUser})

    const handlerEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlerPassword = (e) => {
        setPassword(e.target.value)
    }
    const submitHandler = (e) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((currentUser) => setCurrentUser(currentUser.user))
            .catch((error) => {
                switch (error.code) {
                    case 'auth/too-many-requests':
                    setNoLogin('Demasiados intentos. Intente más tarde');
                    break;
                    case 'auth/network-request-failed':
                    setNoLogin('Error de conexión');
                    break;
                    default:
                    setNoLogin('Usuario y/o contraseña incorrectas');
                    break;
                }
                setlogInError(true)
            })
    }

    useEffect(() => {

        const unsubscribe =onAuthStateChanged(auth, (currentUser) =>{
            setCurrentUser(currentUser)
        });
        return() => {
            unsubscribe()
        }
    },[])

    if (firebaseauth.currentUser) {
        return <Redirect to={Config.defaultPath}/>
    }

    return (<>
            <Breadcrumb />
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="card">
                        <div className="row align-items-center text-center">
                            <div className="col-md-12">
                                <div className="card-body">
                                    <img src={logo} alt="" className="img-fluid mb-4"/>
                                    <h4 className="mb-3 f-w-400">Signin</h4>
                                    <div className="form-group fill">
                                        <input type="email" className="form-control" id="email" placeholder="Email Address" onChange={handlerEmail}/>
                                    </div>
                                    <div className="form-group fill mb-4">
                                        <input type="password" className="form-control" id="password" placeholder="Password" onChange={handlerPassword}/>
                                    </div>
                                    <div className='text-center text-danger'>
                                            {loginerror ? 
                                            <p>{noLogin}</p> : 
                                            <></>
                                            }
                                    </div>
                                    <button className="btn btn-block btn-primary mb-4" onClick={submitHandler}>Signin</button>
                                    <p className="mb-2 text-muted">
                                        Forgot password?{' '}
                                        <NavLink to="/resetpassword" className="f-w-400">
                                            Reset
                                        </NavLink>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
};
export default Login;
