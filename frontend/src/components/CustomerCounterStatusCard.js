import React from "react";

export default class CustomerCounterStatusCard extends React.Component {


    constructor(props) {
        super(props)
        this.state = { data: this.props.item}
        // local sync across browsers instances 
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

    counterStatus(){
        let results;

        if (this.state.data.status === "OF") {
            results = (
                <span className="bg-secondary text-secondary rounded-circle p-2 ">
                    ......
                </span>
                );
              
        }else if (this.state.data.customer) {
            results = (
            <span className="bg-danger text-danger rounded-circle p-2 ">......</span>
            );
        
        } else {
            results = (
                <span className="bg-success text-success rounded-circle p-2">......</span>
                );
        }
        return results;
    }
    render(){
        return(
            <div className="p-4 m-2 card text-center">
            <div className="pb-2">{this.counterStatus()}</div>
            <h5 className="my-4"> Counter {this.props.item.id} </h5>
            <h1> {this.state.data.customer} </h1>
          </div>
        );
    }

}