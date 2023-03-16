import {useContext, createContext, useEffect, useState} from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, getIdToken, sendPasswordResetEmail } from "@firebase/auth";
import { auth } from '../fb';

const AuthContextConsole = createContext()

export const AuthContextProviderConsole = ({children}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [noLogin, setNoLogin] = useState('');

  const createUser = (email, password) => {

    createUserWithEmailAndPassword(auth, email, password)
    .then((curentUser) => {
      setUser(curentUser.user);
    })
  } 


  const signInUser = (email, password) => {

    signInWithEmailAndPassword(auth, email, password) 
    .then((curentUser) => {
      setUser(curentUser.user);
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/wrong-password':
          setNoLogin('Contraseña incorrecta');
          break;
        case 'auth/user-not-found':
          setNoLogin('El usuario no existe');
          break;
        case 'auth/invalid-email':
          setNoLogin('El correo no es válido');
          break;
        case 'auth/too-many-requests':
          setNoLogin('Demasiados intentos. Intente más tarde');
          break;
        case 'auth/user-disabled':
          setNoLogin('El usuario está deshabilitado');
          break;
        case 'auth/network-request-failed':
          setNoLogin('Error de conexión');
          break;
        case 'auth/email-already-in-use':
          setNoLogin('El correo ya está en uso');
          break;
        case 'auth/unverified-email':
          setNoLogin('El correo no está verificado');
          break;
        default:
          setNoLogin('Error desconocido');
          break;
      }
    });
  }

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
  }

  const logOut = () => {
    signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curentUser) => {
      setUser(curentUser);
      if (curentUser != null) {
        curentUser.getIdToken().then((token) => {
          // console.log(token)
          setToken(token);
        })
        // console.log('User', curentUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    }
  }, [user])

  return (
    <AuthContextConsole.Provider value={{logOut, signInUser, resetPassword, createUser, noLogin, user, token}}>
      {children}
    </AuthContextConsole.Provider>
  )
}

export const UserAuthConsole = () => {
  return useContext(AuthContextConsole);
}