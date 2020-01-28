import React from "react";
import { NavLink } from "react-router-dom";
import "./components.css";

class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <div className="home-header">
                    <h6>Welcome To Cab Allocation System Application</h6>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row',  marginRight:200, marginLeft:50}}>
                <div >   
                    <div style={{ display: 'flex', flexDirection: 'row', width: '70%', height: '600px'}}>
                        <img src="/cab.png" alt="inser" width='70%' height='100%'/>
                    </div>      
                </div>
                <div className="home-content">
                    <div ><b>Login as</b> </div>
                    <div>
                         < NavLink to="user"><h3>User</h3></NavLink>
                         <div>
                            <NavLink to="driver"><h3>Driver</h3></NavLink>
                         </div>
                      
                    </div>

                    <div style={{fontSize:20, marginTop:20, color:"red"}}>OR</div>
                    {/* <div style={{marginTop:20}}>
                       
                    </div> */}
                </div>
                    
                </div>
                
            
                <div className="home-settings">
                   <h5> To create USER or DRIVER please click on settings </h5> &nbsp;

                    <NavLink to="settings">Settings</NavLink>
                </div>
            </div>
            

        )
    }
}

export default Home;