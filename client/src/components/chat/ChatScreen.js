import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import instance from '../../Axios/axios';

const socketConnection = socketIOClient('http://localhost:3000')


const ChatScreen = ({user}) => {
    const {orderId} = useParams()
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket ,setSocket] = useState(null)
    const userData = useSelector(store=> 
        user ==='manufacturer' ? 
        store.manufacturer.user :
        store.transporter.user
        )

        useEffect(() => {
            const token = localStorage.getItem(user)
            getMessages(orderId,token)
        },[])

    const getMessages = (orderId,token) => {
        instance.get('/orderDetails/messages',{
            headers : {
                Authorization: `Bearer ${token}`          
              },    
              params : {orderId}
        }).then((res) => {
            setMessages(res?.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        setSocket(socketConnection)
        user==='manufacturer' ? 
            socket?.emit('registerManufacturer',userData._id) :
            socket?.emit('registerTransporter',userData._id)

        socket?.emit('join room' ,orderId)

        socket?.on('recieveMessage', (data) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                data
            ])
        })
     },[socket])

    const handleMessageSubmit = () => {
        if (newMessage.trim() === '') return;
        const message = {
            isFrom : user,
            content : newMessage,
            commonId : orderId
            
        }
        socket?.emit('sendMessage',message)
        
        setMessages(prevMessages => [
            ...prevMessages,
            { content: newMessage, isFrom: user },
        ]);
        setNewMessage('');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex bg-white border rounded-lg overflow-hidden">
                <div className="flex-1 p-4">
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`${
                                    message.isFrom ===user ? 'text-right' : 'text-left'
                                }`}
                            >
                                <div
                                    className={`${
                                        message.isFrom ===user
                                            ? 'bg-blue-100 text-blue-900'
                                            : 'bg-gray-100 text-gray-900'
                                    } p-2 rounded-lg inline-block`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/3 p-4 border-l">
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:shadow-outline-blue"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                    />
                    <button
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
                        onClick={handleMessageSubmit}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;
