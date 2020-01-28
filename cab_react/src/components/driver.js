import React, { Component } from "react";
import axios from "axios";
import "./components.css";
import { NavLink } from "react-router-dom";

class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driver: [],
      drivername: "",
      rideDetails: []
    };
    this.acceptingCab = this.acceptingCab.bind(this);
    this.getUpdate = this.getUpdate.bind(this);
  }

  getUpdate() {
    let obj = this;
    setInterval(function() {
      axios.get("http://127.0.0.1:8000/ridedetails/").then(res =>
    obj.setState({
      rideDetails: res.data
    }, function() {
        console.log('res setting');
        console.log(res.data);
      })
    );
    }, 1000, obj);
  }
  
  componentDidMount() {
    this.getUpdate();
    axios.get("http://127.0.0.1:8000/drivers/")
      .then(res =>
        this.setState({
          driver: res.data
        })
      )
      .catch(err => console.log("Error", err));

    axios.get("http://127.0.0.1:8000/ridedetails/").then(res =>
    this.setState({
      rideDetails: res.data
    }, function() {
        console.log('res setting');
        console.log(res.data);
      })
    );
  }
  


  acceptingCab = (id,drivername) => {
    // console.log("accepting the cab:",id ,drivername);
    // console.log("Length of driver", this.state.rideDetails.filter(items => items.driver === drivername && items.status === "AC").length)
    if (this.state.rideDetails.filter(items => items.driver === drivername && items.status === "AC").length > 0) {
      alert("You are already on a ride, You cannot accept another ride")
    } else {
    axios.put(`http://127.0.0.1:8000/ridedetails/${id}/`, {
      driver:drivername,
      status:"AC"
    })
    .then(res =>
    console.log(res)
      )
    .catch(err => console.log("Error", err))
    alert("Thank you for accepting the ride")
  }
}

  render() {
    let driversList = this.state.rideDetails.filter(items => (items.status === "RE"));
    let renderCondition = this.state.drivername.length > 0 && driversList.length > 0;
    console.log('render: '+renderCondition);
    console.log('ridedetails: '+this.state.rideDetails);
    console.log(driversList);
    return (
      <div className="driver-home">
        <div className="driver-header">
          <NavLink to="/">Home</NavLink>
          &nbsp;
          <NavLink to="/user">User</NavLink>
          &nbsp;
          <NavLink to="/settings">Settings</NavLink>
        </div>
        <h4>Select Driver</h4>
        <select

          value={this.state.value}
          onChange={event => this.setState({ drivername: event.target.value })}
        >
          <option>Select a Driver</option>
          {this.state.driver.map((item, index) => (
            <option key={index} value={item.drivername}>
              {item.id} &nbsp;{item.drivername}
            </option>
          ))}
          {/* {console.log("select value", this.state.drivername)} */}
        </select>
        {/* {console.log("ride", this.state.rideDetails)} */}
        {this.state.drivername
          ? this.state.rideDetails
              .filter(
                items =>
                  (items.driver === this.state.drivername && items.status === "AC")
              )
              .map((driver, index) => (
                <div key={index} className="driver-on-going">
                  <h2>You are presently on ride with {driver.user} </h2>
                </div>
              ))
          : null}




        {
          renderCondition ?
        this.state.rideDetails
          .filter(items => items.status === "RE")
          .map((item, index) => (
            <div key={index} className="display-cards">
              <div className="card">
                <div className="card-details">
                  <h3>Name: &nbsp;{item.user}</h3>
                  <h3>Date: &nbsp;{item.ride_created}</h3>
                  <h3>Status: Requesting</h3>
                  <button onClick={() => this.acceptingCab(item.id,this.state.drivername)}>ACCEPT</button>
                </div>
              </div>
            </div>
          )) : null}



        {(this.state.drivername.length > 0 && this.state.drivername !== 'Select a Driver') ? (
          <div className="driver-ride">
            <h3>{this.state.drivername} Previous Ride Details</h3>
            <table id="customers">
              <thead>
                <tr>
                  <th>UserName</th>
                  <th>Date of Ride</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rideDetails
                  .filter(items => items.driver === this.state.drivername)
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.user}</td>
                      <td>{item.ride_created}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Driver;