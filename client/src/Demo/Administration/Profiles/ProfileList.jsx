import React from 'react'
import {useEffect} from 'react';
import {useState} from 'react';
import Table from 'react-bootstrap/Table'
import { useSelector } from '../../../store/reducer';

function RoleList() {

    const [profiles,setProfiles]=useState([]);
    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken)

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

  return (
    <>
        <Table bordered responsive>
            <thead>
                <tr>
                    <th>Roles</th>
                </tr>
            </thead>
            <tbody>
               <tr>
                    <td>{profiles.profile1}</td>
               </tr>
               <tr>
                    <td>{profiles.profile2}</td>
               </tr>
               <tr>
                    <td>{profiles.profile3}</td>
               </tr>
            </tbody>
        </Table>
    </>
  )
}

export default RoleList