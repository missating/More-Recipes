import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import Main from './Main';
import '../css/style.css';

const App = () => (
  <BrowserRouter>
    <div>
      <Route component={Header} />
      <Route component={Main} />
    </div>
  </BrowserRouter>
);

export default App;
