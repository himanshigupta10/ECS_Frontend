import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import AppBar from '@material-ui/core/AppBar';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
 

ReactDOM.render((

        <div>
            <AppBar title="Book Shop" showMenuIconButton={false} />
            <App />
        </div>
), document.getElementById('root'));
registerServiceWorker();
