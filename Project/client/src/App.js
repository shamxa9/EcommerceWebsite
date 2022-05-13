import './App.css'
import Header from './Header'
import Home from './Home'
import Search from './search'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  return (
    // BEM
    <Router>
    <div className="app">
      <Header />
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
