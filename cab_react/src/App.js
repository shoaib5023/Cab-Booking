import React, { Component } from "react";
import "./App.css";
import BasicRouter from "./components/router";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  render() {  
    return (
        <BrowserRouter>
          <BasicRouter />
        </BrowserRouter>
    );
  }
}


export default App;