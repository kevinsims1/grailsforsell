import React from 'react'
import Vintage from './components/vintage.js'
import Streetwear from './components/streetwear.js'
import Hype from './components/hype.js'
import Nav from './components/Nav.js'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Nav />
    <Switch>
      <Route exact path="/vintage" component={Vintage} />
      <Route path="/streetwear" component={Streetwear} />
      <Route path="/hype" component={Hype} />
    </Switch>
  </Router>
  )
}

export default App
