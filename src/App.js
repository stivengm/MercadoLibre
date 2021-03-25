import logo from './logo.svg';
import './App.scss';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Header from './componentes/header/header';
import DetailItem from './componentes/detail_item/detail_item';
import Search from './componentes/search/search';
import MainPage from './componentes/MainPage';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          {/* <Header parentCallback={this.searchCallbackFunction} /> */}
          <Switch>
  
            <Route path="/items=search=:nameProduct" component={Search} />
  
            <Route path="/items/:id" component={DetailItem} />

            <Route exact path="/" component={MainPage} />
  
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
