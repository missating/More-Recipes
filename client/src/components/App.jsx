import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import Header from './common/Header';
import Main from './main/Main';
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
