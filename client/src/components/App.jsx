import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedHeader } from './common/Header';
import { RouterMain } from './main/Main';
import Footer from './common/Footer';
import '../css/style.css';

const App = () => (
  <BrowserRouter>
    <div>
      <Route component={ConnectedHeader} />
      <Route component={RouterMain} />
      <Route component={Footer} />
    </div>
  </BrowserRouter>
);

export default App;
