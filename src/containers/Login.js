import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Socket from '../utils/socket'

export default class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: true,
            validated: false,
            username: ''
        };

        Socket.on('GET_CURRENT_USER', user => {
            this.setState({
                username: user.username
            })
        })
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
    }

    handleInput = (event) => {
        this.setState({ username: event.target.value })
    }

    handleSubmit = (event) => {
        if (this.state.username === '') {
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                validated: true,
            });
        } else {
            this.props.onSubmit(this.state.username);
            this.handleClose();
        }
    }
    
    render() {
        const { validated } = this.state
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>Welcome to Next Chat!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your username has been randomly generated:
                    <Form noValidate validated={validated}>
                    <Form.Row className="mt-3">
                    <InputGroup noValidate size="lg">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder={this.state.username}
                            aria-label="username"
                            aria-describedby="basic-addon1"
                            value={this.state.username}
                            onChange={this.handleInput}
                            default={this.state.username}
                            required
                            />
                    </InputGroup>
                    </Form.Row>
                    <Form.Row><Form.Text>Sorry! We can't change it due to the API we're using. </Form.Text></Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="btn-chat-app" onClick={this.handleSubmit}>
                    Start Chatting!
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
