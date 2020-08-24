import React, {useState, useEffect, Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SendIcon from '@material-ui/icons/Send';
import io from 'socket.io-client';

import './Chatt.css'

const socket = io('http://localhost:4000');
const username=prompt('Type your name for joined the chat')
class Chat extends Component {

    state = {
        message: '',
        myMessages: [],
        thirdMessage: [],
    }

    constructor() {
        super();
        console.log(username);
        socket.emit('new_user_joined',{name:username})


    }

    componentWillMount() {
        socket.on('user_joined', receiveMessage => {
            console.log(receiveMessage);
            let local = this.state.thirdMessage
            local.push(receiveMessage)
            this.setState({thirdMessage: local})
            console.log(this.state.thirdMessage);
        });




        socket.on('leave', receiveMessage => {
            console.log(receiveMessage);
            let local = this.state.thirdMessage
            local.push(receiveMessage)
            this.setState({thirdMessage: local})
            console.log(this.state.thirdMessage);
        });



        socket.on('receiveMessage', receiveMessage => {
            console.log(receiveMessage);
            let local = this.state.thirdMessage
            local.push(receiveMessage)
            this.setState({thirdMessage: local})
            console.log(this.state.thirdMessage);
        });
    }


    onValue = (e) => {
        this.setState({message: e.target.value})
    }
    sendMessages = () => {

        let local = this.state.myMessages
        local.push(this.state.message)
        this.setState({myMessages: local})

        socket.emit('sendMessage', {
            message: this.state.message,
            time: new Date().toLocaleTimeString(),
            name: 'huzaifa'
        })

    }

    sendMessagesEnter = (e) => {
        if (e.key === 'Enter') {
            this.sendMessages()
        }
    }

    render() {


        return (
            <div className="container-fluid h-100 ">
                <div className="row justify-content-center h-100">
                    <div className="col-md-4 col-xl-3 chat">
                        <div className="card mb-sm-3 mb-md-0 contacts_card">
                            <div className="card-header">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text search_btn"><i className="fas fa-search"> </i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer"></div>
                        </div>
                    </div>
                    <div className="col-md-8 col-xl-6 chat">
                        <div className="card">

                            <div className="card-body msg_card_body">
                                {this.state.thirdMessage.map((item, index) => {
                                    return (<div key={index} style={{float:'left',clear:'both'}} className="d-flex justify-content-start mb-4">
                                            <div className="msg_cotainer">
                                                <span className="name">{item.name}</span>
                                                {item.message}
                                                <span className="msg_time_send">{item.time}</span>
                                            </div>

                                        </div>
                                    )
                                })}

                                {this.state.myMessages.map((item, index) => {
                                    return (
                                        <div key={index} style={{float:'right',clear:'both'}} className="d-flex justify-content-end mb-4">
                                            <div className="msg_cotainer_send">
                                                <span className="name">{item.name}</span>
                                                {item.message}
                                                <span className="msg_time_send">{item.time}</span>
                                            </div>

                                        </div>
                                    )
                                })}

                            </div>


                            <div className="card-footer">
                                <div className="input-group">
                                    <div className="input-group-append">
                                    <span className="input-group-text attach_btn"><i
                                        className="fas fa-paperclip"> </i></span>
                                    </div>
                                    <input onKeyPress={this.sendMessagesEnter} value={this.state.message}
                                              onChange={this.onValue} name=""
                                              className="form-control type_msg"
                                              placeholder="Type your message..."/>
                                    <div className="input-group-append">
                                        <span onClick={this.sendMessages}
                                              className="input-group-text send_btn"><SendIcon/></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat