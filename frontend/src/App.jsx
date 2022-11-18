import { useState, useEffect } from "react";

// const query = `
// query {
//   allLifts{
//     name
//     elevationGain
//     status
//   }
// }
// `;

// const opts = {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ query })
// };


function TakeNumber({ latest_serving_num, last_issued_num }) {
  const handleClick = (event) => {
    // TODO: send a reqyest
  };
  return (
    <div className="col d-flex text-center mx-auto p-5 ">
      <div className="  mx-auto p-5 card animate__animated animate__fadeIn ">
        <h2> Now serving : {latest_serving_num} </h2>
        <h2> Last number : {last_issued_num} </h2>
        <button
          className="btn btn-lg btn-warning"
          onClick={(event) => handleClick(event)}
        >
          Take a Number
        </button>
      </div>
    </div>
  );
}




function CounterStatusButton({onlineStatus}){
    
    const [online, setOnline] = useState();
    
    const changeStatus = (event,param) => {
        setOnline(!online)
    }

    return (
    <button className="btn btn-lg btn-success"
        onClick={(event) => changeStatus(event)}>
        {online ?  "Go Online"  : "Go Offline" }
    </button>
    );
}

function CounterManageCard({currentCustomer, status}){
    
    const nextCustomer = (event) => {

    };
    
    return (
        <div class="card">
            
        </div>
    );
    
}

function CounterCard({ number, status, currentCustomer }) {
  let results;
  if (status === "OF") {
    results = (
      <span className="bg-secondary text-secondary rounded-circle p-2 ">
        ......
      </span>
    );
  } else if (status === "SR") {
    results = (
      <span className="bg-danger text-danger rounded-circle p-2 ">......</span>
    );
  } else {
    results = (
      <span className="bg-success text-success rounded-circle p-2">......</span>
    );
  }
  return (
    <div className="p-4 m-2 card text-center">
      <div className="pb-2">{results}</div>
      <h5 className="my-4"> Counter {number} </h5>
      <h1> {currentCustomer} </h1>
    </div>
  );
}

function LoadingCards({ message, numberOfCards }) {
  return (
    <div className="container">
      <div className="row ">
        {[...Array(numberOfCards)].map((elementInArray, index) => (
          <div
            key={index}
            className=" bg-dark col card animate__animated animate__pulse animate__infinite m-4 "
          >
            <div className="card-body">
              <h5 className="card-title">{message}</h5>
              <div className="p-5"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CounterCardCollection({ url, opts }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url, opts)
      .then((response) => response.json())
      .then((data) => setData(data))
      .then(() => setLoading(false))
      .catch(setError);
  }, []);

  if (loading)
    return <LoadingCards message="Loading Data Counters" numberOfCards={4} />;
  if (error) return <pre> {JSON.stringify(error)}</pre>;
  if (!data) return null;

  // UI test data
  // const data = [
  //   { id: 1, status: "OF", customer: 5 },
  //   { id: 2, status: "SR", customer: 3 },
  //   { id: 3, status: "SR", customer: 2 },
  //   { id: 4, status: "ON", customer: 1 }
  // ];

  return (
    <div className="container">
      <div className="row">
        {data.map((counter) => (
          <div className="col">
            <CounterCard
              number={counter.id}
              status={counter.status}
              currentCustomer={counter.customer}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <h1 className="text-center text-warning  p-5"> Customer View </h1>

      <CounterStatusButton
        onlineStatus={false}
      />

      <CounterCardCollection />
    </>
  );
}
