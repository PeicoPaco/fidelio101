// import * as React from 'react';
import { Row, Col, Card, Table, Form } from 'react-bootstrap';
import * as $ from 'jquery';
import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';

import {NavLink} from 'react-router-dom'
import { useSelector } from '../../../store/reducer';
import PNotify from 'pnotify/dist/es/PNotify';


// @ts-ignore
$.DataTable = require('datatables.net-bs');
require('jszip');
require('pdfmake/build/pdfmake.js');
require('pdfmake/build/vfs_fonts.js');
require('datatables.net-autofill');
require('datatables.net-buttons-bs');
require('datatables.net-buttons/js/buttons.colVis.js');
require('datatables.net-buttons/js/buttons.flash.js');
require('datatables.net-buttons/js/buttons.html5.js');
require('datatables.net-buttons/js/buttons.print.js');
require('datatables.net-colreorder');
require('datatables.net-keytable');
require('datatables.net-responsive-bs');
require('datatables.net-rowgroup');
require('datatables.net-rowreorder');
require('datatables.net-scroller');
require('datatables.net-select');
require('datatables.net-fixedcolumns');
require('datatables.net-fixedheader');


function atable(mydata, token) {  
  let tableZero = '#data-table-zero';
  $.fn.dataTable.ext.errMode = 'throw';
  // @ts-ignore
  $(tableZero).DataTable({
      "language": {
        "emptyTable": "Aun no hay registros en esta tabla"
      },
      destroy: true,
      data: mydata,
      "lengthMenu": [ 5, 10, 25, 50 ],
      order: [[5]],
      columns: [
          {
              data: 'name',
              render: function (data, type, row) {
                  var nameComplete = row.name + ' ' + row.lastName;
                  return nameComplete;
              }
          },
          {
              data: 'dni', 
              render: function (data, type, row) {
                  return data;
              }
          },
          {
              data: 'email',
              render: function (data, type, row) {
                  return data;
              }
          },
          {
            data: 'createdBy',
            render: function (data, type, row) {
                  return data;
            }
          },
          {
            data: 'createdAt',
            render: function (data, type, row) {
                var ts = new Date(data._seconds * 1000 + data._nanoseconds/1000000);
                return ts.toLocaleString()
            }
          },
          {
            data: 'role',
            render: function (data, type, row) {
                  return data;
            }
          },
          {
            data: 'nameLocal',
            render: function (data, type, row) {
                  return data;
            }
          },
          {
            data: 'nameClient',
            render: function (data, type, row) {
                  return data;
            }
          },
          {
            data: 'isActive',
            render: function (data, type, row) {
                if(row.isActive){
                    return "Activo"
                }else{
                    return "Inactivo"
                }
            }
          },
          {
            data: null,
            render: function (data, type, row) {  
              if (row.profile.length > 0) {
                return `
                <!-- Button trigger Details modal -->
                <button type="button" class="btn btn-primary details-btn" id="${row.id}">
                    <span class="details"><i class="fa fa-address-card"></i></span>
                </button>
                `
            } else {
                return `
                <!-- Button trigger Edit modal -->
                <button type="button" class="btn btn-primary edit-btn" id="${row.email}">
                  <span class="edit"><i class="fa fa-pen"></i></span>
                </button>

                <!-- Button trigger Details modal -->
                <button type="button" class="btn btn-primary details-btn" id="${row.email}">
                  <span class="details"><i class="fa fa-address-card"></i></span>
                </button>

                <!-- Button trigger Delete modal -->
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal-${row.dni}">
                  <span class="remove"><i class="fa fa-trash"></i></span>
                </button>

                <!-- Delete Modal -->
                    <div class="modal fade" id="deleteModal-${row.dni}" tabindex="-1" aria-labelledby="exampleModal" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModal">Eliminar</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p>¿Está seguro que desea eliminar Portal Staff ${row.name}?</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-danger delete-btn" data-bs-dismiss="modal">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>  
                `;
              }  
            }
          }
      ],
      columnDefs: [
        {"type": "date", "targets": 5},
      ],
  });
  $(tableZero).on('click','button.delete-btn',function(){

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
            title: 'Eliminado',
            text: "El Staff de Portal se eliminó satisfactoriamente :D",
            stack: window.stackBottomLeft,
            delay:3000
        });
        $(tableZero).DataTable().row($(this).parents('tr')).remove().draw();
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
            text: "No se logró eliminar el Staff de Portal :(",
            stack: window.stackBottomLeft,
            delay:3000
        });
    };
    const data = $(tableZero).DataTable().row($(this).parents('tr')).data();
    const body = JSON.stringify({clientId: data.clientId, email: data.email});
    $.ajax({
        url: `${process.env.REACT_APP_BASE_URL}/staff/`+data.dni,
        type: 'DELETE',
        data: body,
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token 
        },
        mode: 'cors',
        success: function() {
          // window.location.reload();
          toggleShow();
        },
        error: function(){
            toggleApiError();
        }
    });
  });  
  $(tableZero).on('click','button.edit-btn',function(){
    const data = $(tableZero).DataTable().row($(this).parents('tr')).data();
    window.location.href = '/editportalstaff/'+ data.dni;
  });

  $(tableZero).on('click','button.details-btn',function(){
    const data = $(tableZero).DataTable().row($(this).parents('tr')).data();
    window.location.href = '/detailsportalstaff/'+ data.dni;
  });
}

function PortalStaffList() {

  const profile = useSelector((state) => state.sessionReducer.profile)
  const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken);
  const dataFetchedRef = useRef(false);
  const [client,setClient]=useState([]);


  useEffect(()=>{
    if(dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetch(`${process.env.REACT_APP_BASE_URL}/clients`, {
      headers:{
        "Content-Type": "application/json",   
        Authorization: 'Bearer ' + reduxtoken,
      }
    })
        .then((response) =>  response.json())
        .then((apiData) =>{
          
            setClient(apiData)
          })
        },[])

  const handle = (e) => {
    Object.values(client).map((item) => {
      if (item.name === e.target.value) {
        fetch(`${process.env.REACT_APP_BASE_URL}/staff/all/`+item.id, {
          headers:{
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + reduxtoken,
          },
          mode: 'cors',
        })
        .then((response) =>  {
          if (!response.ok) {
            atable([], reduxtoken);
            throw Error ('No users in this client yet!')
          }
          return response.json()})
        .then((apiData) =>{
            atable(apiData, reduxtoken)
        }).catch((error) => console.log('catch: ' + error.message))
      }
    })
  } 

  const optionsClient = client.map((item) => {
    return (
      <option key={item.name} value={item.name}>
        {item.name}
      </option>
    )
  })
  return (<>
    <Row>
        <Col>
            <Card>
                <Card.Header>
                  <Form onChange={handle}>
                  {/* <Form> */}
                    <Form.Row className='justify-content'>
                      <Col md={3}>
                        <Row>
                          <Form.Group>
                            <Card.Title as="h5">Portal Staff List</Card.Title>
                            {profile=="User"? 
                              null
                              :
                                (<NavLink to="/createportalstaff"><Button size='md'>+ Agregar</Button></NavLink>)}
                          </Form.Group>
                        </Row>
                      </Col>
                      <Row>
                          <Form.Group className="ml-5">
                            <Form.Control size="sm" as="select" placeholder='Client Id' required>

                              <option value=''>Seleccionar</option>
                                {optionsClient}
                            </Form.Control>
                          </Form.Group>   
                        </Row>
                    </Form.Row>
                  </Form>
                </Card.Header>
                <Card.Body>
                    <Table striped hover responsive bordered id="data-table-zero">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>DNI</th>
                                <th>Email</th>
                                <th>Creado por</th>
                                <th>Fecha de Creación</th>
                                <th>Rol</th>
                                <th>Local</th>
                                <th>Cliente</th>
                                <th>Estado</th>
                                <th>Botones</th>
                            </tr>
                        </thead>
                    </Table>
                </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    )
}

export default PortalStaffList