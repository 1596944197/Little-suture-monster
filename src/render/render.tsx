import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '/static/style.less';
import "@arco-design/web-react/dist/css/arco.css";

const root = createRoot(document.getElementById('container') as HTMLElement);
root.render(<App />);