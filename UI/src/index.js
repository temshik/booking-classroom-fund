import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import store from './redux/store';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2VVhkQlFacldJXnxLd0x0RWFab19xflBGal5YVAciSV9jS31TdEdkWH5bc3ZXQGhYUA==');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>        
      <App/>    
    </BrowserRouter>
  </Provider>
);
