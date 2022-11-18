import './CounterManagerCard.css';
import CounterStatusButton  from './CounterStatusButton';
import ServiceApi from '../services/ServiceApi';
import React from 'react';

export default class  CounterManagerCard extends React.Component {

  constructor(props){
    super(props);
    this.state  = {data : this.props.item}
    
    
    // local sync across browsers instances 
    var self = this;
    if('serviceWorker' in navigator){
        navigator.serviceWorker
        .register('./service-worker.js')
        .then(()=> navigator.serviceWorker.ready).then(() => {
          navigator.serviceWorker.addEventListener('message',function(event){
            if(event.data && event.data.counterData !== undefined){
              console.log(event.data.counterData);
              // check is it belong to this component 
              if(event.data.counterData.id == self.state.data.id){
                if(event.data.counterData.customer.toLowerCase() === "queue empty"){
                  event.data.counterData.customer = null
                }
                self.setState({
                  data: event.data.counterData
                });
              }
            }
          })
        })
      }
  }
  
  onClickNexCustomer = (event, data) => {
       
    let updateData = this.state.data
    updateData["status"] = "ON";
    ServiceApi.counterOnlineStatus(updateData).then( (res)=> {
      console.log(res)
      this.setState({ data: res});
      // update counter status to other browsers 
      if(navigator.serviceWorker && navigator.serviceWorker.controller){
        navigator.serviceWorker.controller.postMessage({
          counterData: res 
        });
      } 
    }).then(() => {

      ServiceApi.getNextCounterInQueue(this.props.item).then((response) => {
        data["customer"] = response.results[0].id

        // send the message to all other browsers 
        if(navigator.serviceWorker && navigator.serviceWorker.controller){
          navigator.serviceWorker.controller.postMessage({
            counterData: data
          })
          navigator.serviceWorker.controller.postMessage({
            lastServed: data.customer
          })
        }

        this.setState({
          data
        });
        console.log(response.results[0])
     
      })
    });
  };




  render() {
  return (
    <div className="card p-5 m-2">
      <h2 className='text-center mb-5'>
      Counter  {this.state.data.id}  
      </h2>
      <CounterStatusButton item={this.state.data}  goOfflineAction={this.props.goOfflineAction} goOnlineAction={this.props.goOnlineAction} />
      <h1 className='text-center my-5'>
      {this.state.data.customer}
      </h1>
      <button className="btn btn-warning" onClick={event => this.onClickNexCustomer(event, this.state.data)}>
        Next Customer
      </button>
    </div>
  )
  }
}
