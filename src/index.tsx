import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { TodoApi } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApiProvider api={TodoApi}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);

