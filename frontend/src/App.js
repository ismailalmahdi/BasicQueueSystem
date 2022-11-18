import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import './App.css';

import { AppContext } from './AppContext';
import Welcome from './pages/Welcome'
import CounterManager from './pages/CounterManager'
import Customers from './pages/Customers'
import AppSidebar from './AppSidebar';
import ServiceApi from './services/ServiceApi';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      setCounterStatusOnline: this.setCounterStatusOnline.bind(this),
      setCounterStatusOffline: this.setCounterStatusOffline.bind(this),
    };
    
    // ServiceApi.retrieveWishlist().then((data) => {
    //   this.setState({ wishlist: data });
    // });

  
  }


  setCounterStatusOnline(item){
    return new Promise((resolve) => {
      ServiceApi.counterStatus(item.id,true).then( ()=> {
        this.setState({ item });

        // update counter status to other browsers 
        if(navigator.serviceWorker && navigator.serviceWorker.controller){
          navigator.serviceWorker.controller.postMessage({
            counterData: item
          })
        }

        resolve(item);
      })
      
    });
  }

 
  setCounterStatusOffline(item){
    return new Promise((resolve) => {
      ServiceApi.counterStatus(item.id,false).then( ()=> {
        this.setState({ item });

        // update counter status to other browsers 
        if(navigator.serviceWorker && navigator.serviceWorker.controller){
          navigator.serviceWorker.controller.postMessage({
            counterData: item
          })
        } 
        resolve(item);
      })
      
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <nav className="">
            <div className="App-nav__main">
              <NavLink className="btn mx-4 p-2 text-light" to="/">Queue Ticketing System</NavLink>
              <p className='mx-4 p-2 text-light'>V1.0 by Ismail AL.Mahdy</p>
            </div>
            <div className="App-nav__links">
            
            </div>
          </nav>
          <section className="App-content">
            <AppContext.Provider value={this.state}>
              <Route path="/" exact component={Welcome} />
              <Route path="/Counters" exact component={CounterManager}/>
              <Route path="/Customers" exact component={Customers}/>
            </AppContext.Provider>
          </section>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
