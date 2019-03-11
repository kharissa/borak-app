import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import moment from 'moment'

export default class Chats extends React.Component {

    componentDidUpdate(){
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        const { endOfMessages } = this.refs;
        endOfMessages.scrollIntoView();
    }

    returnDate = (date) => {
        return moment(date).calendar().toString();
    }

    render() {
        const { chats, username } = this.props
        return(
            <Col className="chat-history pb-5"> 
                {
                    chats.map((chat, index) =>

                        <Row className={`chat ${username === chat.username ? "justify-content-end" : "justify-content-start"}`} key={index}>

                            <Col className={`col-sm-2 chat-image text-center order-${username === chat.username ? 12 : 1}`} key={index}>

                                <img 
                                    src={`https://avatars.dicebear.com/v2/avataaars/${username === chat.username ? username : chat.username}.svg`}
                                    alt={`My profile pic`} 
                                    className="chat-avatar" 
                                />
                                <p className="chat-username mt-1" key={index}>{ chat.username } </p>

                            </Col>
                            <Col className={`col-auto d-flex flex-column chat-content wordwrap order-${username === chat.username ? `1 chat-content-right` : 12}`} key={99 + index}>
                                <div>
                                    { chat.message }
                                </div>  
                                <div className={`chat-timestamp mt-auto ${username === chat.username ? `` : `ml-auto`}`} key={index}>
                                    { this.returnDate(chat.timestamp) }
                                </div>
                            </Col>
                        </Row>
                    )
                }
                <div ref="endOfMessages"></div>
            </Col>
        )
    }
}
