import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import moment from 'moment'
import Socket from '../utils/socket'

export default class SendForm extends React.Component {
    state = {
        message: '',
        validated: false,
        charCount: 500,
    }

    handleInput = (event) => {
        const length = event.target.value.length
        this.setState({
            message: event.target.value,
            charCount: 500 - length
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.message === '') {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ 
                validated: true,
            });
        } else {
            const timestamp = Date.now();
            const data = {
            'username': this.props.username,
            'message': this.state.message,
            'timestamp': timestamp
            }
            Socket.emit('BROADCAST_MESSAGE', data);
            // const updatedChats = [...this.props.chats].concat(data);
            // this.props.onSend(updatedChats);
            this.setState({ 
                message: '',
                charCount: 500
            });
        }
    } 
    
    render() {
        const { validated } = this.state;

        return (
            <Row className="message-input px-5">
                <Col>
                    <Form 
                        noValidate 
                        onSubmit={this.handleSubmit} 
                        validated={validated}
                    >
                        <Form.Row className="my-3">
                            <InputGroup>
                                <Form.Control 
                                    as="textarea" 
                                    type="text" 
                                    aria-label="Submit Message" 
                                    maxLength ={500}
                                    value={this.state.message} 
                                    onChange={this.handleInput} 
                                    required 
                                />
                                <InputGroup.Append>
                                    <Button type="submit" variant="primary" className="btn-chat-app" onClick={this.handleSubmit}>Send Message</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <Form.Text className="text-muted">
                                Remaining characters: {this.state.charCount}
                            </Form.Text>
                        </Form.Row>
                    </Form>
                </Col>
            </Row>
        )
    }
}
