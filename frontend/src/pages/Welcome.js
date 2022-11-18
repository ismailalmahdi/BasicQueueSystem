import React from 'react';
import './Welcome.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';

export default class OneCounterList extends React.Component {
  static context = AppContext;

  render() {
    return (
   
      <div className="text-light animate__animated animate__fadeIn">
           <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <main className="mb-auto">
              <div className=''>
                  <h1 className="">Welcome to,</h1>
                  <h2 className="text-warning">Queue Ticketing System</h2>
                  <p className="lead mr-md-3">This is a simple queue app </p>
                  <p className="text-warning"><u> I would like to start as a </u></p>
                  <p className="lead">
                      <Link className="btn btn-lg btn-secondary " to="/Customers">Customer</Link>
                      <Link className="btn btn-lg btn-secondary mx-4" to="/Counters">Counter Manager</Link>
                  </p>
                </div>
            </main>
            </div>
      </div>
    );
  }
}

