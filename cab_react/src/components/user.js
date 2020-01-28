import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      username: "",
      rideDetails: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/users/")
      .then(res =>
        this.setState({
          user: res.data
        })
      )
      .catch(err => console.log("Error", err));

    axios
      .get("http://127.0.0.1:8000/ridedetails/")
      .then(res =>
        this.setState({
          rideDetails: res.data
        })
      )
      .catch(err => console.log("Error", err));
  }

  bookingCab = (username) => {
    // For bookin the cab I am taking the username
    const user = this.state.user.filter(item=> item.username === username)
    // console.log('user detail:', user)
    // console.log("user id",user[0].id)
    // console.log("length", this.state.rideDetails.filter(items => items.user == username && items.status == "AC").length)
    if (this.state.rideDetails.filter(items => items.user === username && items.status === "AC").length > 0) {
        alert("You can't book the cab as you are already on board")
    } else if (this.state.rideDetails.filter(items => items.user === username && items.status === "RE").length > 0) {
        alert("You have already requested for the cab")
    }
    else {
        axios.post(`http://127.0.0.1:8000/ridedetails/`,{
            user:user[0].id,
            status:"RE"
        })
        alert("Thank you for booking the cab")
    }   
  };

  endTrip = (id) => {
    axios.put(`http://127.0.0.1:8000/ridedetails/${id}/`,{
      status:"DO"
    })
    .then(res => console.log("End Trip", res.data.status))
    .catch(err => console.log("Error", err))
    alert("Thank you for riding, You can book the cab from now on")
  }

  render() {
    return (
      <div className="driver-home">
        <div className="driver-header" >
          <NavLink to="/">Home</NavLink>
          &nbsp;
          <NavLink to="/driver">Driver</NavLink>
          &nbsp;
          <NavLink to="/settings">Settings</NavLink>
        </div>
        <h4>Select User</h4>
        <select
          value={this.state.value}
          onChange={event => this.setState({ username: event.target.value })}
        >
          <option>Select a User </option>
          {this.state.user.map((item, index) => (
            <option key={index} value={item.username} >
              {item.id} &nbsp;{item.username}
            </option>
          ))}
       
          {console.log("select value", this.state.username)}
        </select>
        <div></div>
        {(this.state.username.length > 0 && this.state.username !== "Select a User") ? (
          <button className="booking-button" onClick={() => this.bookingCab(this.state.username)}>
            Book Cab
          </button>
        ) : null}
        {console.log("Filtering", (this.state.rideDetails.filter(items => ((items.user === this.state.username && items.status !== "AC") || (items.user === this.state.username && items.status !== "RE"))).length > 0))}
        {console.log("ride", this.state.rideDetails)}
        {this.state.rideDetails
          .filter(
            items => (items.user === this.state.username && items.status === "RE")
          )
          .map((item, index) => (
            <div key={index} className="driver-on-going">
              {console.log("drivername", item.driver)}
              <h2>You have requested for the CAB</h2>
            </div>
          ))}

        {this.state.rideDetails
          .filter(
            items => items.user === this.state.username && items.status === "AC"
          )
          .map((item, index) => (
            <div key={index} className="driver-on-going">
              {console.log("drivername", item.driver)}
              <h2>
                You are on the CAB with {item.driver} <button onClick={() => this.endTrip(item.id)}>End Trip</button>
              </h2>
            </div>
          ))}

        {(this.state.username.length > 0 && this.state.username !== "Select a User") ? (
          <div className="driver-ride">
            <h3>{this.state.username} Previous Ride Details </h3>
            <table id="customers">
              <thead>
                <tr>
                  <th>Driver Name</th>
                  <th>Date of Ride</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rideDetails
                  .filter(items => items.user === this.state.username)
                  .map((item, index) => (
                    <tr key={index}>
                      {console.log("table content", item)}
                      <td>{item.driver}</td>
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

export default User;