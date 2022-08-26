import React from "react";
// import {withRouter, useHistory} from 'react-router-dom';
import logo from "./price-drop.jpg"
import background from "./giphy.gif"

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
