import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import { BrowserRouter } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
    <BrowserRouter>
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    </BrowserRouter>
    )
  }
}

export default App;