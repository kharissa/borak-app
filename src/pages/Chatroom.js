import React from 'react'
import ChatHistory from '../components/ChatHistory'
import Chats from '../components/Chats'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SendForm from '../containers/SendForm'
import Login from '../containers/Login'
import UsersList from '../containers/UsersList'
import Socket from '../utils/socket'

export default class Chatroom extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            chats: [],
            username: null,
            users: [],
            show: true
        };

        Socket.emit('NEW_USER');

        Socket.on('RECEIVE_BROADCAST', data => {
            const updatedChats = [...this.state.chats].concat(data);
            this.setState({
                chats: updatedChats
            });
        })

        Socket.on('UPDATE_USER_LIST', users => {
            const newUsers = [];
            users.map(user => 
                newUsers.push(user.username)
            )
            this.setState({
                users: newUsers
            })
        })
    }

    componentDidMount = () => {
        this.setState({
            chats: ChatHistory
        });
    }

    updateChats = (chats) => {
        this.setState({
            chats: chats
        });
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    handleSubmit = (username) => {
        this.setState({ 
            username: username
        });
    }
    
    render() {
        const { chats, username, users } = this.state
        return (
            <Container className="App" fluid>
                <Row className="chatroom">
                    <Col md={2} className="users-list p-3">
                        <UsersList users={users}/>
                    </Col>
                    <Col>
                    <Chats chats={chats} username={username}/>
                     <SendForm 
                    chats={chats} 
                    onSend={this.updateChats} 
                    username={username}
                />
                    </Col>
                </Row>
               
                <Login show={this.state.show} onHide={this.handleClose} onSubmit={this.handleSubmit}/>
            </Container>
        )
    }
}
