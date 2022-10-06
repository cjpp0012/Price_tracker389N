import React from "react";
// import {withRouter, useHistory} from 'react-router-dom';
// import logo from "./price-drop.jpg"
import background from "./giphy.gif"
import icon from "./360_F_293396301_JCm1p815YEbh7ga75XOUuEsaDVlZ2O0C.jpg"


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


class Home extends React.Component  {
    constructor(props) {
        super(props);
        this.validate1 = this.validate1.bind(this);
        this.validate2 = this.validate2.bind(this);
        this.state = {
            name: "",
            minPrice: 0,
            maxPrice: 0,
            submitButt: false
        };
    }

    validate1 = e => {
        var prod_name = document.getElementById("productid").value;
        if (prod_name === "") {
            e.preventDefault();
            document.getElementById("warn1").innerHTML = "You have not entered product name. Please try again."
        }
        else {
            this.setState({
                name: prod_name,
                minPrice: 0,
                maxPrice: 0,
                submitButt: true
            })
        }
    }

    validate2 = e => {
        var prod_name = document.getElementById("productname").value
        var min = document.getElementById("minPrice").value
        var max = document.getElementById("maxPrice").value
        if (prod_name === "") {
            e.preventDefault();
            document.getElementById("warn2").innerHTML = "You have not entered product name. Please try again."
        }
        else if (min > max || min < 0 || max < 0) {
            e.preventDefault();
            alert("Invalid price.")
        }
        else {
            this.setState({
                name: prod_name,
                minPrice: min,
                maxPrice: max,
                submitButt: true
            })
        }
    }
    submitData = e =>{
        fetch('/product/:').then()//////////////
        this.props.history.push({
            pathname:"/Item",
            state: this.state
        });
    }




    render(){
        return (
            <div class="bg" style={{ backgroundImage: `url(${background})` }}>
            <div class="home">

    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
        <img
              src= {icon}
              width="50"
              height="50"
              alt="Logo"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Top Deal</Nav.Link>
            <NavDropdown title="Your Price Tracks" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/1">All Alerts</NavDropdown.Item>
              <NavDropdown.Item href="#action/2">
                All Price Watches
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3">Top Drops</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/4">
                About Us
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>






                    <center>
                        <h1>Welcome to Best Price Tracker</h1>
                        <p className="lead">
                        The Best Place to <text style={{color:'green'}}>Save</text> Money
                        </p>
                    </center>
                    <form id="seach"
                    method="post"
                    onSubmit={this.submitData}>
                    <legend>Enter your Product Name here:</legend>
                    <div id="warn1" style={{color: 'red'}} />
                    <input type="search" id="productid" placeholder="Enter product name here" size={40} />
                    <input type="submit" id="processIDButton" onClick={this.validate1} defaultValue="Find" />
                    <br /><br />or<br /><br />
                    <legend>Search by Price Range here:</legend>
                    <p id="warn2" style={{color: 'red'}} />
                    <input type="search" placeholder="Enter product here" id="productname" size={30} /> from $<input type="number" id="minPrice" min={0} style={{width: '4em'}} /> to $<input type="number" id="maxPrice" min={0} style={{width: '4em'}} />
                    <br /><br /><input type="submit" defaultValue="Search" onClick={this.validate2}  />
                    </form>
            </div>
            </div>
            
        );
    }
}

    export default Home;
