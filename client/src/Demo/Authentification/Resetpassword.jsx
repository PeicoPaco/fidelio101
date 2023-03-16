import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useState} from 'react';
import '../../assets/scss/style.scss';
import { auth } from '../../fb';
import { sendPasswordResetEmail } from '@firebase/auth';
import Breadcrumb from '../../App/layout/AdminLayout/Breadcrumb';
import logoDark from '../../assets/images/logo-dark.png';

function Resetpassword() {

  const [email, setEmail] = useState('');
  const [showmessage, setShowMessage] = useState(false);
  const [errormessage, setErrorMessage] = useState(false);

  const handlerEmail = (e) => {
    setEmail(e.target.value)
  }

  const submitHandler = (e) => {
    sendPasswordResetEmail(auth, email).then(() => setShowMessage(true)).catch((error) => setErrorMessage(true))
  }

  return (
    <>
            <Breadcrumb />
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="card">
                        <div className="row align-items-center text-center">
                            <div className="col-md-12">
                                <div className="card-body">
                                    <img src={logoDark} alt="" className="img-fluid mb-4"/>
                                    <h4 className="mb-3 f-w-400">Reset your password</h4>
                                    <div className="form-group fill">
                                        <input type="email" className="form-control" id="email" placeholder="Email Address" onChange={handlerEmail}/>
                                    </div>
                                    <div className='text-center text-primary'>
                                            {showmessage ? 
                                            <p>Check your email for the link</p> : 
                                            <></>
                                            }
                                    </div>
                                    <div className='text-center text-danger'>
                                            {errormessage ? 
                                            <p>Email not found</p> : 
                                            <></>
                                            }
                                    </div>
                                    <button className="btn btn-block btn-primary mb-4" onClick={submitHandler}>Reset password</button>
                                    <p className="mb-0 text-muted">
                                        Don’t have an account?{' '}
                                        <NavLink to="/" className="f-w-400">
                                            Signup
                                        </NavLink>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Resetpassword