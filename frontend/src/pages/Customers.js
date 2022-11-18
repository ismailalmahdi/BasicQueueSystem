import React from 'react';
import './CounterManager.css';
import { AppContext } from '../AppContext';
import CustomerCounterStatusCard from '../components/CustomerCounterStatusCard'
import CustomerTakeANumber  from '../components/CustomerTakeANumber';
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
    this.props.history.push('/Counters');
  }

  async goOfflineAction(item){
    console.log("Go Offline "+item.id)
    await this.context.setCounterStatusOffline(item);
    const { history } = this.props;
    history.push("/Customers")
  }

  render() {
    const { list } = this.state;
    return (
      <section className='animate__animated animate__fadeIn'>
        <header>
        </header>
        <section className="container">
          <CustomerTakeANumber />
          <div className='row'>
          {list.map(item => {
            return (
              <div key={item.id} className='col'>
                <CustomerCounterStatusCard
                  item={item}
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
