import React from "react";
import icon from "./360_F_293396301_JCm1p815YEbh7ga75XOUuEsaDVlZ2O0C.jpg"

class Item extends React.Component  {
    constructor(props) {
        super(props);
        this.stores = this.stores.bind(this)
        this.history = this.history.bind(this)
        this.updatesubscribeButton = this.updatesubscribeButton.bind(this)
        this.subscribeButton = this.subscribeButton.bind(this)
        // this.updateData = this.updateData.bind(this)
        // this.getData = this.getData.bind(this)
        this.cancelsubscribeButton = this.cancelsubscribeButton.bind(this)
        this.state = {
            name: "Product not found",
            hisPrice: [],
            price:0,
            email:"",
            currStorePrice: -1,
            storeOption:"ebay",
            lowestHisPrice: -1,
            hisOption:"date_max",
        };
    }

    subscribeButton(e){
        e.preventDefault();
        if (this.state.email.indexOf('@') === -1) {
            document.getElementById("warn3").innerHTML = "Your email address is invalid. Please try again.";
        }
        else if (this.state.price < 0 || this.state.price === "") {
            document.getElementById("warn3").innerHTML = "Price must be greater or equal to 0.";
        }
        else {
            let data = {item: this.state.name, email: this.state.email, desired_price: this.state.price}
            let options ={
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              }
            fetch('/track', options);
            alert("Your notification has been successfully registered. Please check your email at " + this.state.email);
        }
    }




    updatesubscribeButton(e){
        e.preventDefault();
        if (this.state.email.indexOf('@') === -1) {
            document.getElementById("warn3").innerHTML = "Your email address is invalid. Please try again.";
        }
        else if (this.state.price < 0 || this.state.price === "") {
            document.getElementById("warn3").innerHTML = "Price must be greater or equal to 0.";
        }
        else {
            let data = {item: this.state.name, email: this.state.email, desired_price: this.state.price}
            let options ={
                method: 'put',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              }
            fetch('/track', options).then(res=>res.json())
            .then(data=> {if (data.success===true) {alert("You has been successfully update subscribtion for your email" + this.state.email)} else {alert("Fail to update, please check your email address")}} )
        }
    }




    cancelsubscribeButton(e){
        e.preventDefault();
        if (this.state.email.indexOf('@') === -1) {
            document.getElementById("warn3").innerHTML = "Your email address is invalid. Please try again.";
        }
        else {
            let data = {item: this.state.name, email: this.state.email}
            let options ={
                method: 'delete',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              }
            fetch('/track', options).then(res=>res.json())
            .then(data=> {if (data.success===true) {alert("You has been successfully remove subscribtion for your email" + this.state.email)} else {alert("Fail to update, please check your email address")}} )
            
        }
    }

    stores(e){        
        let historyPrice = this.state.hisPrice
        const obj = historyPrice.reduce(function(prev, curr) {return prev.date < curr.date ? prev : curr;});
        console.log(obj.price)
        this.setState({
            storeOption: e.currentTarget.value,
            currStorePrice: obj.price
        })
        // document.getElementById("price").innerHTML = "$" + this.state.currStorePrice;
    }


    history(e){
        let historyPrice = this.state.hisPrice
        const hisOption = this.state.hisOption
        const his = {"date_1w":7,"date_1m":30,"date_6m":30*6,"date_1y":365,"date_5y":365*5,"date_max": Infinity};
        const now = new Date().getTime();
        
        const opt = historyPrice.filter(curr => (now-curr.date)/(1000*3600*24) <= his[hisOption])
        console.log(typeof(opt))
        console.log((opt))
        const lastPrice = opt.reduce(function(prev, curr) {return prev.date < curr.date ? prev : curr;});
        
        this.setState({
            hisOption: e.currentTarget.value,
            lowestHisPrice: lastPrice.price
            });
        // document.getElementById("lowest").innerHTML = "$" + this.state.lowestHisPrice;
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    not_available(e) {
        e.preventDefault();
        alert("Sorry, this feature is not allowed at this time")
    }

    // getData() {
    //     fetch('/product')
    //     .then(res => res.json())
    //     .then(data => {
    //     const productData = data.info.filter(prod => prod.item == this.state.name)
    //     console.log(productData)
    //     this.setState(
    //       (prevState) => { return { hisPrice: productData} }
    //     )
    //     })
    // }

    // updateData(){
    //     let data = {item: this.props.history.location.state.name}
    //     let options ={
    //       method: 'post',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //       ,body: JSON.stringify(data)
    //     }
    //     fetch('/product', options).then(res=>res.json())
    //     .then(data=>{console.log(data.productName); this.setState((prevState)=>{ return { name: data.productName}})})
    // }

    async componentDidMount(){
        let data = {item: this.props.history.location.state.name}
        let options ={
          method: 'post',
          headers: {
            'Content-Type':'application/json'
          }
          ,body: JSON.stringify(data)
        }
        const resp = await fetch('/product', options)
        const json = await resp.json();
        this.setState({ name: json.productName});

        const resp_d = await fetch('/product')
        // /'+this.state.name
        const json_d = await resp_d.json();
        const productData = json_d.info.filter(prod => prod.item === this.state.name)
        console.log(productData)
        this.setState({hisPrice: productData});

        let historyPrice = this.state.hisPrice
        const obj = historyPrice.reduce(function(prev, curr) {return prev.date < curr.date ? prev : curr;});
        this.setState({
            currStorePrice: obj.price
        })


        let history = this.state.hisPrice
        const hisOption = this.state.hisOption
        const his = {"date_1w":7,"date_1m":30,"date_6m":30*6,"date_1y":365,"date_5y":365*5,"date_max": Infinity};
        const now = new Date().getTime();
        const opt = history.filter(curr => (now-curr.date)/(1000*3600*24) <= his[hisOption])
        const lastPrice = opt.reduce(function(prev, curr) {return prev.date < curr.date ? prev : curr;});
        this.setState({
            lowestHisPrice: lastPrice.price
        });
    }


    render(){
        return (
            <div class="item">
            <div class="top">
            <img class="icon" src={icon} alt="icon" ></img>
              <a href="/">Home</a>
              <a href="/" onClick={this.not_available}>Top Price drops</a>
              <a href="/" onClick={this.not_available}>Contact</a>
              <a href="/" onClick={this.not_available}>About</a>
            </div>
            <br />

            <div id="productt">{this.state.name}</div>
            <form class="selectstore">
                The last available price:<span id="price">${this.state.currStorePrice}</span> on:
                <br />
                <div class="container">
                <div class="row">
                    <div class="col-sm"><input type="radio" value="allstore" checked={this.state.storeOption==="allstore"} onClick={this.stores} />All platforms</div>
                    <div class="col-sm"><input type="radio" value="amazon" onClick={this.not_available} />Amazon</div>
                    <div class="col-sm"><input type="radio" value="ebay" checked={this.state.storeOption==="ebay"} onClick={this.stores} />Ebay</div>
                    <div class="col-sm"><input type="radio" value="walmart" onClick={this.not_available} />Walmart</div>
                    <div class="col-sm"><input type="radio" value="anystore" onClick={this.not_available} />Any Third Party</div>
                </div>
                </div>
            </form>

            <form class="date_range">
                <div id="lowestHis">Lowest Price History:<span id="lowest">${this.state.lowestHisPrice}</span></div> within Date Range:
                <div class="container">
                <div class="row">
                <div class="col-md"><input type="radio" value="date_1w" checked={this.state.hisOption==="date_1w"} onClick={this.history} />1 week</div>
                    <div class="col-md"><input type="radio" value="date_1m" checked={this.state.hisOption==="date_1m"} onClick={this.history} />1 month</div>
                    <div class="col-md"><input type="radio" value="date_6m" checked={this.state.hisOption==="date_6m"} onClick={this.history} />6 months</div>
                    <div class="col-md"><input type="radio" value="date_1y" checked={this.state.hisOption==="date_1y"} onClick={this.history} />1 year</div>
                    <div class="col-md"><input type="radio" value="date_5y" checked={this.state.hisOption==="date_5y"} onClick={this.history} />5 years</div>
                    <div class="col-md"><input type="radio" value="date_max" checked={this.state.hisOption==="date_max"} onClick={this.history} />Max</div>
                </div>
                </div>
                <br />
            </form>

            <form id="pricewatch" onSubmit={(e)=>{this.subscribeButton(e)}}>
                <div class="droptitle">Create Price Drop Notification</div>
                <p>Enter your email address below to receive emails as soon as this price becomes available.</p>
                <p id="warn3" style={{color:'red'}} />
                Send Emails to 
                <input type="email" name="email" placeholder="your email address" value={this.state.email} onChange={(e)=>{this.handleChange(e)}} required />
                 when the Price Drops to
                $<input type="number" name="price" value={this.state.price} onChange={(e)=>{this.handleChange(e)}} style={{width:'4em'}} required />
                <input type="submit" id="pricetrackButton" value="Submit" />
                <input type="button" onClick= {(e)=>{this.updatesubscribeButton(e)}} value="update"/>
                <input type="button" onClick= {(e)=>{this.cancelsubscribeButton(e)}} value="Unsubscribe"/>
            </form>
            </div>
        );
    }
}

export default Item;