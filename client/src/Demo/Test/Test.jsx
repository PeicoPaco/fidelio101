import React, { useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import * as actionTypes from '../../store/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../store/reducer';

function Test() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter)
  const add = () => dispatch({ type: actionTypes.INCREMENT });
  const decrease = () => dispatch({ type: actionTypes.DECREASE });
  const [addnumber, setAdder] = useState(8);
  const parameter = (addnumber) => dispatch({type: actionTypes.INCREMENTPARAMETER, addnumber: addnumber});

  const handleClick = (e) => {
    parameter(addnumber)
  }
  
  return (
    <>
    <Row>
        <Col>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Test Redux {counter}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Button onClick={add}>+</Button>
                  <Button onClick={decrease}>-</Button>
                  <Row>
                  <Button onClick={handleClick}>{addnumber}</Button>
                  </Row>
                  <Row>
                    <Button onClick={() => setAdder(4)}>Change Adder</Button>
                  </Row>
                </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
  )
}

export default Test