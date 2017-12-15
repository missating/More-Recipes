import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
    <BrowserRouter>
      <div>
          <Route component={Header} />
          <Route component={Main}/>
          <Route component={Footer} />
      </div>
    </BrowserRouter>
    )
  }
}

export default App;