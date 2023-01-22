import React from 'react';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import icon from '../images/image1.svg';
import styles from '../styles/Chat.module.css';
import EmojiPicker from 'emoji-picker-react';
import Messages from './Messages';

const socket = io.connect('http://localhost:5000/');

const Chat = () => {
  const { search } = useLocation();
  const [params, setParams] = useState('');
  const [state, setState] = useState([]);
  const [message, setMessage] = useState('');
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit('join', searchParams);
  }, [search]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);
  console.log(state);

  const leftRoom = () => {};
  const handleChange = ({ target: { value } }) => {
    setMessage(value);
  };
  const onEmojiClick = ({ emoji }) => {
    setMessage(`${message} ${emoji}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit('sendMessage', { message, params });

    setMessage('');
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{params.room}</div>
        <div className={styles.users}>0 users in room</div>
        <button className={styles.left} onClick={leftRoom}>
          left room
        </button>
      </div>
      <div className={styles.messages}>
        <Messages messages={state} name={params.name} />
      </div>

      <form className={styles.form}>
        <div className={styles.input}>
          <input
            type='text'
            name='message'
            value={message}
            placeholder='say something'
            onChange={handleChange}
            autoComplete='off'
            required
          />
        </div>
        <div className={styles.emoji}>
          <img src={icon} alt='smile' onClick={() => setOpen(!isOpen)} />
          {isOpen && (
            <div className={styles.emojies}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <div className={styles.button}>
          <input type='submit' value='Send message' onSubmit={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default Chat;
