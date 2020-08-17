import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Button,
  Input,
  InputLabel,
  IconButton
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import FlipMove from 'react-flip-move';
import './App.css';
import Message from './Message';

import firebase from 'firebase';
import db from './firebase';

interface MessageUploadData {
  user: string;
  content: string;
  timestamp: firebase.firestore.FieldValue;
}

interface MessageObject {
  id: string;
  message: firebase.firestore.DocumentData;
}

const App = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<MessageObject[]>([]);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    if (username) return;
    setUsername(prompt('Please enter your username.') || 'Guest');
  }, []);

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        const snapshotMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          message: doc.data()
        }));
        setMessages(snapshotMessages);
      });
  }, []);

  const sendMessage = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!input) return;

    const message: MessageUploadData = {
      user: username,
      content: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    db.collection('messages').add(message);

    setInput('');
  };

  return (
    <div className='App'>
      <img
        className='app__messengerLogo'
        src='https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100'
        alt='facebook-messenger-logo'
      />
      <h2>Welcome {username}</h2>
      <form className='app__form' onSubmit={sendMessage}>
        <FormControl className='app__formControl'>
          <InputLabel>Enter a message...</InputLabel>
          <Input
            className='app__input'
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            className='app__iconButton'
            type='submit'
            disabled={!input}
            color='primary'
          >
            <Send />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
};

export default App;
