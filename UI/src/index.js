import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import store from './redux/store';
import App from './App';
import { registerLicense } from '@syncfusion/ej2-base';
import './index.css';

// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2VVhkQlFacldJXnxLd0x0RWFab19xflBGal5YVAciSV9jS31TdEdkWH5bc3ZXQGhYUA==');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>        
      <App/>    
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
