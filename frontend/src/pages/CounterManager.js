import React from 'react';
import './CounterManager.css';

import { AppContext } from '../AppContext';

import CounterManagerCard from '../components/CounterManagerCard'
import ServiceApi from '../services/ServiceApi';





export default class CounterManager extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageIndex: 1,
      totalItems: 0,
    }
    this.updateList();
  }

  updateList() {
    const { pageIndex, filters } = this.state;
    const queryParams = {};
    ServiceApi.retrieveCounterList(pageIndex, queryParams).then((data) => {
      const { results, count } = data;
      this.setState({ list: results, totalItems: count });
    });
  }

  async goOnlineAction(item) {
    console.log("Go Online "+item.id)
    await this.context.setCounterStatusOnline(item);
  
  }

  async goOfflineAction(item){
    console.log("Go Offline "+item.id)
    await this.context.setCounterStatusOffline(item);
  
  }

  async nextCustomerAction(item){
    
  }
  render() {
    const { list } = this.state;
    return (
      <section className='animate__animated animate__fadeIn'>
        <header>
        </header>
        <section className="container">
          <div className='row'>
          {list.map(item => {
            return (
              <div key={item.id} className='col'>
                <CounterManagerCard
                  item={item}
                  nextCustomerAction={this.nextCustomerAction.bind(this)}
                  goOfflineAction={this.goOfflineAction.bind(this)}
                  goOnlineAction={this.goOnlineAction.bind(this)}
                />
            </div>
            );
          })}
          </div>
        </section>
      </section>
    );
  }
};
