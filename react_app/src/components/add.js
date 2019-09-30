import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class Add extends Component{

    constructor(props){
        super(props);
    }

    handleSubmit(event) {
        fetch('http://localhost:3333/add?', {
            method: 'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                id : event.target.Id.value,
                first : event.target.First.value,
                last : event.target.Last.value,
                age : event.target.Age.value
            })
        }).then(res => res.json()).then((result) => {
            console.log(result);
        }
        )
    }

    render(){
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Add registration
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="container">
                    <Row>
                        <Col sm={8}>
                            <Form onSubmit={this.handleSubmit}>

                                <Form.Group controlId="Id" >
                                    <Form.Label>Id</Form.Label>
                                    <Form.Control
                                    type="text"
                                    id="Id"
                                    name="Id"
                                    required
                                    placeholder="Id"
                                    />
                                </Form.Group>

                                <Form.Group controlId="First">
                                    <Form.Label>First</Form.Label>
                                    <Form.Control
                                    type="text"
                                    id="First"
                                    name="First"
                                    required
                                    placeholder="First"
                                    />
                                </Form.Group>

                                <Form.Group controlId="Last">
                                    <Form.Label>Last</Form.Label>
                                    <Form.Control
                                    type="text"
                                    id="Last"
                                    name="Last"
                                    required
                                    placeholder="Last"
                                    />
                                </Form.Group>

                                <Form.Group controlId="Age">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                    type="text"
                                    id="Age"
                                    name="Age"
                                    required
                                    placeholder="Age"
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Button variant='primary' type='submit'>Add reg</Button>
                                </Form.Group>
                                
                            </Form>
                        </Col>
                    </Row>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='dark' onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>

        )
    }
}
export default Add;