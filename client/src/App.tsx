import * as React from 'react';
import './App.css';

import { Layout } from '@components';
class App extends React.Component {
  public render() {
    return (
      <Layout>
        Content
      </Layout>
    );
  }
}

export default App;


// <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.tsx</code> and save to reload.
//         </p>
//       </div>

// import { Switch, Route } from 'react-router';
// import './App.css';
// import Header from './components/header';

// // Pages
// import { Home } from './containers/home';
// import { Hscode } from './containers/hscode';
// import { Year } from './containers/year';

// <div className="App">
//         <Header />
//         <div className="container">
//           <Switch>
//             <Route path="/hscode/:id" component={Hscode}/>
//             <Route path="/year/:year" component={Year}/>
//             <Route path="/" component={Home}/>
//           </Switch>
//         </div>
//       </div>