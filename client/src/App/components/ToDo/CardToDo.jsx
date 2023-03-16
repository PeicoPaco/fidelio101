import * as React from 'react';
import { createRef, useState, useEffect } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { ValidationForm, TextInputGroup } from 'react-bootstrap4-form-validation';
import complete from '../../../assets/images/complete.png';
const CardToDo = (props) => {
    const formRef = createRef();
    const [newNote, setNewNote] = useState('');
    const [cardTodo, setCardTodo] = useState([]);
    useEffect(() => {
        setCardTodo(props.todoList);
    }, [props.todoList]);
    const completeHandler = (key) => {
        const newCard = cardTodo.map((item, index) => {
            return index === key ? { ...item, complete: !item['complete'] } : item;
        });
        setCardTodo(newCard);
    };
    const handleChange = (e) => {
        setNewNote(e.target.value);
    };
    const handleSubmit = (e, formData, inputs) => {
        e.preventDefault();
        setCardTodo([...cardTodo, { note: newNote, complete: false }]);
        setNewNote('');
        resetForm();
    };
    const resetForm = () => {
        if (formRef.current)
            formRef.current.resetValidationState(true);
    };
    const handleErrorSubmit = (e, formData, errorInputs) => {
        //console.log(errorInputs);
    };
    const completeStyle = {
        backgroundImage: `url(${complete})`,
        position: 'absolute',
        top: '5px',
        right: '5px',
        content: '',
        width: '55px',
        height: '55px',
        backgroundSize: '100%'
    };
    const todoListHtml = cardTodo.map((item, index) => {
        return (<li key={index} className={item.complete ? 'complete' : ''} onClick={() => completeHandler(index)}>
                {item.complete ? <span style={completeStyle}/> : ''}
                <p>{item.note}</p>
            </li>);
    });
    return (<React.Fragment>
            <Row>
                <Col>
                    <ValidationForm ref={formRef} onSubmit={handleSubmit} onErrorSubmit={handleErrorSubmit}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <TextInputGroup name="newNoteCard" id="newNoteCard" placeholder="Create your task list" required append={<Button type="submit" variant="secondary">
                                            <i className="fa fa-plus"/>
                                        </Button>} value={newNote} onChange={handleChange} autoComplete="off"/>
                            </Form.Group>
                        </Form.Row>
                    </ValidationForm>
                    <section id="task-container">
                        <ul id="task-list">{todoListHtml}</ul>
                    </section>
                </Col>
            </Row>
        </React.Fragment>);
};
export default CardToDo;
