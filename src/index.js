import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
// import './styles.css';
import App from './components/App';

const conteiner = document.getElementById('root');
const root = createRoot(conteiner);

root.render(
  <Router>
    <App />
  </Router>,
);
