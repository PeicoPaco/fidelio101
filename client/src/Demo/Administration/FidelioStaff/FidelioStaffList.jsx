// import * as React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import * as $ from 'jquery';
import { useEffect, useRef } from 'react';
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
      data: mydata,
      destroy: true,
      "lengthMenu": [ 5, 10, 25, 50 ],
      order: [[8]],
      columns: [
          {
              data: 'name',
              render: function (data, type, row) {
                if(row.lastName){
                  var nameComplete = row.name + ' ' + row.lastName;
                  return nameComplete;
                }else{
                  return data;
                }
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
              data: 'fidelioTeam',
              render: function (data, type, row) {
                  return data;
              }
          },
          {
            data: 'role',
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
            data: 'createdAt',
            render: function (data, type, row) {
                var ts = new Date(data._seconds * 1000 + data._nanoseconds/1000000);
                return ts.toLocaleString()
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
                }  else {
                    return `
                    <!-- Button trigger Edit modal -->
                    <button type="button" class="btn btn-primary edit-btn" id="${row.id}">
                        <span class="edit"><i class="fa fa-pen"></i></span>
                    </button>
    
                    <!-- Button trigger Details modal -->
                    <button type="button" class="btn btn-primary details-btn" id="${row.id}">
                        <span class="details"><i class="fa fa-address-card"></i></span>
                    </button>
    
                    <!-- Button trigger Delete modal -->
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal-${row.id}">
                        <span class="remove"><i class="fa fa-trash"></i></span>
                    </button>
    
                    <!-- Delete Modal -->
                        <div class="modal fade" id="deleteModal-${row.id}" tabindex="-1" aria-labelledby="exampleModal" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModal">Eliminar</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p>¿Está seguro que desea eliminar al miembro ${row.name}?</p>
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
          },
      ],
      columnDefs: [
        {"type": "date", "targets": 8},
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
            text: "El miembro de Fidelio se eliminó satisfactoriamente :D",
            stack: window.stackBottomLeft,
            delay:3000
        });
        $(tableZero).DataTable().row($(this).parents('tr')).remove($(this).closest('tr')).draw();
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
            text: "No se logró eliminar al miembro de Fidelio :(",
            stack: window.stackBottomLeft,
            delay:3000
        });
};
    const data = $(tableZero).DataTable().row($(this).parents('tr')).data();
    $.ajax({
        url: `${process.env.REACT_APP_BASE_URL}/staffFidelio/`+ data.id,
        type: 'DELETE',
        data: JSON.stringify({email: data.email}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        success: function(result) {
            toggleShow();
        },
        error: function(){
            toggleApiError();
        }
    });
  });

  $(tableZero).on('click','button.edit-btn',function(){
    const data = $(tableZero).DataTable().row($(this).parents('tr')).data();
    window.location.href = '/editfideliostaff/'+ data.email;
  });

  $(tableZero).on('click','button.user-btn',function(){
    const data = $(tableZero).DataTable().row($(this).parents('tr')).data();
    window.location.href = '/createfideliouser/'+ data.email;
  });

  $(tableZero).on('click','button.details-btn',function(){
    const data = $(tableZero).DataTable().row($(this).parents('tr')).data();
    window.location.href = '/detailsfideliostaff/'+ data.email;
  });
}

function FidelioStaffList() {


    const reduxtoken = useSelector((state) => state.firebaseauth.currentUser.stsTokenManager.accessToken)
    const dataFetchedRef = useRef(false)

  useEffect(()=> {


            if(dataFetchedRef.current) return;
            dataFetchedRef.current = true;

            fetch(`${process.env.REACT_APP_BASE_URL}/staffFidelio/`, {
            headers:{
                "Content-Type": "application/json",
            Authorization: 'Bearer ' + reduxtoken,
            },
            mode: 'cors',
            })
            .then((response) =>  response.json())
            .then((apiData) =>{
                atable(apiData, reduxtoken)
                
            }).catch((error) => console.log('catch' + error))
    
  },[])

  return (<>
    <Row>
        <Col>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Fidelio Staff List</Card.Title>
                    <NavLink to="/createfideliostaff"><Button size='md'>+ Agregar</Button></NavLink>
                </Card.Header>
                <Card.Body>
                    <Table striped hover responsive bordered id="data-table-zero">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>DNI</th>
                                <th>Email</th>
                                <th>Creado por</th>
                                <th>Team</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Fecha de Creación</th>
                                <th>Action</th>
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

export default FidelioStaffList