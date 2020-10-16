import React, { Component } from 'react';

import './App.css';



class App extends Component {
  

  constructor() {
    super();
    const date = new Date();

    this.state = {
      hour : date.getHours() % 12, //0 am and 12 pm will all be show as "0"
      minute : date.getMinutes(),
      second : date.getSeconds(),
      ampm : date.getHours() >= 12 ? "pm" :"am",
      minuteText : null,
      secondText : null,
      stop : false,
      pause: false,
      clickHour:false,
      clickMinute:false,
      clickSecond:false
    }

    if (this.state.stop === false) {
      this.starting = setInterval(()=> {
      this.addSecond()
    }, 1000)
    }
    
  }


  addZero = (time) => {
    const timeString = `${time}`;
      if (timeString.length === 2) return time
      return `0${time}`
  }

  addSecond = () => {
    this.setState({
      second : this.addZero(Number(this.state.second) + 1),
      minute : this.addZero(Number(this.state.minute)),
      hour : this.addZero(Number(this.state.hour))
    })

    //console.log(this.state.hour)
    if (this.state.ampm === 'pm' && this.state.hour === 0) {
      this.setState({
        hour : 12
      }) // set hour 12 pm fix the display issue

      console.log("this now pm")
    }
    // set hours 1-12
    let currentHour = this.state.hour % 12;
    //console.log(currentHour);
    //console.log(typeof(currentHour));
    if (currentHour === 0) {
      this.setState( {
        hour : 12
      })
    } else {
      this.setState({
        hour : this.addZero(Number(currentHour))
      })
    }
   
    if (this.state.second >= 60) {
      this.setState({
        minute : this.addZero(Number(this.state.minute) + 1),
        second : this.addZero(0)
      })
    }

    if (this.state.minute >= 60) {
      this.setState({
        hour : this.addZero(Number(this.state.hour) + 1 ),
        minute : this.addZero(0)
      })
    }

  }

  stopCounting = () => {
    clearInterval(this.starting)
    console.log("stop Counting")
  }

  clickHour(){
    this.setState({clickHour:true,
    pause: true,  clickMinute:false,clickSecond:false

  })
  }

  hourOnChange = (event) => {
    console.log("hour change");
    let newvalue = event.target.value;
    if (newvalue < 0 || newvalue > 12) {
      alert("the hour range is from 1 to 12")
    } else {
      this.setState({
        hour : event.target.value
      })
    }
  }

  minuteOnChange = (event) =>  {
    console.log("minute change");
    let newvalue = event.target.value;
    if (newvalue < 0 || newvalue >= 60) {
      alert("the minute range is from 1 to 59")
    } else {
      this.setState({
        minute : event.target.value
      })
    }
  }

  secondOnChange = (event) => {
    console.log("second change");
    let newvalue = event.target.value;
    if (newvalue < 0 || newvalue >= 60) {
      alert("the second range is from 1 to 59")
    } else {
      this.setState({
        second : event.target.value
      })
    }
  }

  ampmOnChange = (event) => {
    console.log("ampm change");
    let newvalue = event.target.value;
    if (this.state.hour === 12 && newvalue === "am") {
      alert("Invalid input. Hour: 12 can only match to pm!")
    } else if(this.state.hour === 0 && newvalue ==="pm") {
      alert("Invalid input. Hour: 0 can only match to am!")
    }
    this.setState({
      ampm : event.target.value
    })

  }
  handleEnter = (event) => {
    if(event.key === 'Enter'){
    this.starting = setInterval(()=> {
      this.addSecond()
    }, 1000)
  }
  }  
  render() {
    const style = {
      height: '20px',
      width: '20px',
      padding: '5px',
      margin : '5px',
      align: 'center',  
    }
    let date = new Date();
    //this.getCorrectFormat(date)
    // this.setState({hour : date.getHours()})
    // this.setState({minute : date.getMinutes()})
    // this.setState({second : date.getSeconds()})

  
      return (
        <div className="App">
          <header className="App-header">
            <h3> London Clock</h3>
          </header>
          <div className = "Inputs">

            <input style = {style} value = {this.state.hour} onClick = {()=>this.stopCounting()} onChange = {(event) => this.hourOnChange(event)} onKeyDown={(event) => this.handleEnter(event)}></input> <span >:</span>
            <input style = {style} value = {this.state.minute} onClick = {()=>this.stopCounting()} onChange = {(event)=> this.minuteOnChange(event)} onKeyDown={(event) => this.handleEnter(event)}></input> <span>:</span>
            <input style = {style} value  = {this.state.second} onClick = {()=>this.stopCounting()} onChange = {(event) => this.secondOnChange(event)} onKeyDown={(event) => this.handleEnter(event)}></input> <span>:</span>
            <input style = {style} value = {this.state.ampm} onClick = {()=>this.stopCounting()} onChange = {(event)=> this.ampmOnChange(event)} onKeyDown={(event) => this.handleEnter(event)} ></input>

          </div>  
        </div>
      );
  }



}

export default App;
