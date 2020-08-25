import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SendIcon from '@material-ui/icons/Send';
import io from 'socket.io-client';
import audio from '../../sound/whatsapp_incoming.mp3'
import './Chatt.css'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
const socket = io('https://chatapprealtimeio.herokuapp.com');

class Chat extends Component {
  

    myAudio=React.createRef()
    state = {
        message: '',
        Messages: [],
        connectedNames:[]
    }


    componentDidMount() {
        socket.on('users',users=>{
            this.setState({connectedNames:users})
        })

        socket.emit('new_user_joined', {name:this.props.name })
            socket.on('welcome', receiveMessage => {

                let local = this.state.Messages

                let div = <div style={{float: 'left', clear: 'both'}} className="d-flex justify-content-end mb-4">
                    <div className="msg_cotainer">
                        <span className="name">{receiveMessage.name}</span>
                        {receiveMessage.message}
                        <span className="msg_time_send">{receiveMessage.time}</span>
                    </div>

                </div>
                local.push(div)
                this.audioPlay()
                this.setState({Messages: local})
            });

    }

    componentWillMount() {

        socket.on('userDisconnect',users=>{
            this.setState({connectedNames:users})
        })
        socket.on('user_joined', receiveMessage => {

            console.log(receiveMessage);
            let local = this.state.Messages

            let div =  <div style={{float:'left',clear:'both'}} className="d-flex justify-content-end mb-4">
                <div className="msg_cotainer">
                    <span className="name">{receiveMessage.name}</span>
                    {receiveMessage.message}
                    <span className="msg_time_send">{receiveMessage.time}</span>
                </div>

            </div>
            local.push(div)
            this.audioPlay()
            this.setState({Messages: local})
        });




        socket.on('leave', receiveMessage => {

            let local = this.state.Messages
            let div =  <div style={{float:'left',clear:'both'}} className="d-flex justify-content-end mb-4">
                <div className="msg_cotainer">
                    <span className="name">{receiveMessage.name}</span>
                    {receiveMessage.message}
                    <span className="msg_time_send">{receiveMessage.time}</span>
                </div>

            </div>
            local.push(div)
            this.audioPlay()
            this.setState({Messages: local})
        });



        socket.on('receiveMessage', receiveMessage => {

            let local = this.state.Messages
            let div =  <div style={{float:'left',clear:'both'}} className="d-flex justify-content-end mb-4">
                <div className="msg_cotainer">
                    <span className="name">{receiveMessage.name}</span>
                    {receiveMessage.message}
                    <span className="msg_time_send">{receiveMessage.time}</span>
                </div>

            </div>
            local.push(div)
            this.audioPlay()
            this.setState({Messages: local})
        });
    }


    onValue = (e) => {
        this.setState({message: e.target.value})
    }
    sendMessages = () => {


        socket.emit('sendMessage', {
            message: this.state.message,
            time: new Date().toLocaleTimeString(),
            name:this.props.name
        })



        let local = this.state.Messages
        let div =  <div  style={{float:'right',clear:'both'}} className="d-flex justify-content-end mb-4">
            <div className="msg_cotainer_send">
                <span className="name">{this.props.name}</span>
                {this.state.message}
                <span className="msg_time_send">{new Date().toLocaleTimeString()}</span>
            </div>

        </div>
        local.push(div)

        this.setState({Messages: local})

        this.setState({message:''})
    }

    sendMessagesEnter = (e) => {
        if (e.key === 'Enter') {
            this.sendMessages()
        }
    }

    audioPlay=()=>{
        console.log(this.myAudio.current.play());
    }

    render() {


        return (
            <div className="container-fluid h-100 ">
                <div className="row justify-content-center h-100">
                    <div className="col-md-4 col-xl-3 chat connected">
                        <div className="card mb-sm-3 mb-md-0 contacts_card">
                            <div className="card-header">
                                <div className="input-group">
                                        <div className="input-group-prepend text-white">
                                            People currently chatting :
                                        </div>
                                </div>
                            </div>
                            <div className="card-body contacts_body">
                                <ul className="contacts">

                                    {this.state.connectedNames.map((item,index)=>{
                                        return(
                                            <li key={index} className="active">
                                                <div className="d-flex bd-highlight">
                                                    <div className="user_info">
                                                        <span>{item} <FiberManualRecordIcon className='online_icon'/></span>
                                                        <p>{item} is connected</p>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}

                                </ul>
                            </div>
                            <div className="card-footer"> </div>
                        </div>
                    </div>
                    <div className="col-md-8 col-xl-6 chat">
                        <div className="card">
                            <div className="card-header msg_head">
                                <div className="d-flex bd-highlight">

                                    <div className="user_info">
                                        <span>{this.state.connectedNames.length} people are connected <FiberManualRecordIcon className='online_icon'/></span>

                                    </div>

                                </div>

                            </div>

                            <div className="card-body msg_card_body">

                                {this.state.Messages.map((item,index)=>{
                                    return     <div key={index}>{item}</div>
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

                <audio ref={this.myAudio} id='audio' src={audio}> </audio>

            </div>
        )
    }
}

export default Chat