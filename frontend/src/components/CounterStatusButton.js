import React from 'react';
import './CounterStatusButton.css';
import { useState } from 'react';
import ServiceApi from '../services/ServiceApi';

export default class CounterStatusButton extends React.Component{


  constructor(props){
    super(props)

    this.state = {
      data: this.props.item,
    }
    

    var self = this;
    if('serviceWorker' in navigator){
      navigator.serviceWorker
      .register('./service-worker.js')
      .then(()=> navigator.serviceWorker.ready).then(() => {
          navigator.serviceWorker.addEventListener('message',function(event){
              if(event.data && event.data.counterData !== undefined){
              // check is it belong to this component 
              if(event.data.counterData.id == self.state.data.id){
                  self.setState({
                      data: event.data.counterData
                  });
              }
              }
          })
      })
    }

  }


  async setCounterStatusOnline(event){
   
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
    });
  }

 
  async setCounterStatusOffline(event){
      let updateData = this.state.data
      updateData["status"] = "OF";
      ServiceApi.counterOnlineStatus(updateData).then( (res)=> {
        console.log(res)
        this.setState({ data: res});
        // update counter status to other browsers 
        if(navigator.serviceWorker && navigator.serviceWorker.controller){
          navigator.serviceWorker.controller.postMessage({
            counterData: res 
          });
        } 
      });
  }


  render(){
    if(this.state.data.status === "OF" ){
      return(
      <button className="btn btn-lg btn-success"
          onClick={event => this.setCounterStatusOnline(event)}>
          Go Online
      </button>);
    }else{
      return(
        <button className="btn btn-lg btn-danger"
            onClick={event => this.setCounterStatusOffline(event)}>
            Go Offline
        </button>);
    }
  }

}



