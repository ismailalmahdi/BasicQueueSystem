import React from "react";
import ServiceApi from "../services/ServiceApi";

export default class CustomerTakeANumber extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            last_issued_num : "None",
            latest_serving_num: "None",
        }
        ServiceApi.getLatestServingCustomer().then((response) => {
            this.setState({
                latest_serving_num: response.results[0].id
            });
        });

        ServiceApi.getLatestQueueNumber().then((response) => {
            this.setState({
                last_issued_num: response.results[0].id
            });
        });
        
        // local sync across browsers instances 
        var self = this;
        if('serviceWorker' in navigator){
            navigator.serviceWorker
            .register('./service-worker.js')
            .then(()=> navigator.serviceWorker.ready).then(() => {
              navigator.serviceWorker.addEventListener('message',function(event){
                if(event.data && event.data.state !== undefined){
                  self.setState({
                        last_issued_num: event.data.state
                    });
                }
              })
            })
          }
        
        // local sync across browsers instances 
        var self = this;
        if('serviceWorker' in navigator){
            navigator.serviceWorker
            .register('./service-worker.js')
            .then(()=> navigator.serviceWorker.ready).then(() => {
              navigator.serviceWorker.addEventListener('message',function(event){
                if(event.data && event.data.lastServed !== undefined){
                    
                    self.setState({
                            latest_serving_num: event.data.lastServed
                    });

                }
              })
            })
          }
    }

    
   
    async takeANumber(event){
        
        ServiceApi.CustomerTakeANumber().then((response) => {
            // send the message to all other browsers 
            if(navigator.serviceWorker && navigator.serviceWorker.controller){
                navigator.serviceWorker.controller.postMessage({
                    state: response.id
                })
            }

            this.setState({
                last_issued_num: response.id
            });
        });
    }

    render(){
        return (
            <div className="col d-flex text-center mx-auto p-5 ">
              <div className="  mx-auto p-5 card animate__animated animate__fadeIn ">
                <h2> Now serving : {this.state.latest_serving_num} </h2>
                <h2> Last number : {this.state.last_issued_num} </h2>
                <button
                  className="btn btn-lg btn-warning"
                  onClick={(event) => this.takeANumber(event)}
                >
                  Take a Number
                </button>
              </div>
            </div>
          );
    }
} 