import React from 'react';
import data from './data/data.json';
import './App.css';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { MDBDataTable } from 'mdbreact';

class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      amountFrom: 0,
      amountTo: 0,
      someFdate: new Date(),
      someTdate: new Date(),
      amountShow: 0,
      dateShow: 0

    }
  }

  amountCond = () => {
    this.setState({ amountShow: 1 })
  }

  dateCond = () => {
    this.setState({ dateShow: 1 })
  }

  timeTo = (today) => {

    let d = new Date(today);
    let oneDayNow = d.setDate(d.getDate() + 1);
    oneDayNow = new Date(oneDayNow).toISOString().slice(0, 10);
    var g2 = new Date(oneDayNow);
    g2 = g2.getTime()
    this.setState({ newt: g2 })

  }

  timeFrom = (today) => {

    let d = new Date(today);
    let oneDayFromNow = d.setDate(d.getDate() + 1);
    oneDayFromNow = new Date(oneDayFromNow).toISOString().slice(0, 10);
    var g1 = new Date(oneDayFromNow);
    g1 = g1.getTime()
    this.setState({ newf: g1 })

  }

  handleTimeSearch = () => {

    if(this.state.newf > this.state.newt){
      alert('Invalid date range')
      return;
    }

    let dateArray = [];
    for (let i = 0; i < this.state.dataSource.length; i++) {
      var backenedDate = this.state.dataSource[i].date
      var reverse = backenedDate.split("-").reverse().join("-")
      var r1 = new Date(reverse);
      r1 = r1.getTime()
      if ((r1 >= this.state.newf) && (r1 <= this.state.newt)) {
        dateArray.push(this.state.dataSource[i]);
      }
    }
    this.setState({ dataSource: dateArray })
  }


  handleAmountFrom = (event) => {
    this.setState({ amountFrom: event.target.value })
  }

  handleAmountTo = (event) => {
    this.setState({ amountTo: event.target.value })
  }

  handleAmountSearch = () => {
   
    let searchArray = [];
    if((this.state.amountFrom == 0) && (this.state.amountTo == 0)){
       alert('Enter amount')
       return
    }
   
  else if((this.state.amountFrom == 0) && (this.state.amountTo !== 0)){
      alert('Enter initial amount')
       return
    }

    else if((this.state.amountFrom !== 0) && (this.state.amountTo == 0)){
      alert('Enter final amount')
       return
    }

    for (let i = 0; i < this.state.dataSource1.length; i++) {
      
      if ((this.state.dataSource1[i].amount >= this.state.amountFrom) && (this.state.dataSource1[i].amount <= this.state.amountTo)) {
        searchArray.push(this.state.dataSource1[i]);
      }
    }
    this.setState({  dataSource: searchArray })

  }



  componentDidMount() {
  
     var settingData = localStorage.setItem('added-items', JSON.stringify(data))
     var retrievedData = localStorage.getItem('added-items');
     var finalData = JSON.parse(retrievedData);
     this.setState({ dataSource: finalData, dataSource1: finalData })

 }


  render() {
   
    const datakp = {
      columns: [
        {
          label: 'Id',
          field: 'id',
          sort: 'asc',
          width: 20
        },
        {
          label: 'Name',
          field: 'title',
          sort: 'asc',
          width: 70
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc',
          width: 20
        },
        {
          label: 'Date',
          field: 'date',
          sort: 'asc',
          width: 20
        },

      ],
      rows: this.state.dataSource

    }


    return (
      <>
        <div className="main">

          {this.state.amountShow === 0 ? <button onClick={this.amountCond}>Search by Amount</button> : ''}

          {this.state.amountShow === 1 ?
            <>
              <input className="mdb-datatable-filter flex-row" type="number" placeholder="initial amount" onChange={this.handleAmountFrom}></input>
              <input type="number" placeholder="final amount" onChange={this.handleAmountTo}></input>
              <button onClick={this.handleAmountSearch}>OK</button>
            </> : ''}


          {this.state.dateShow === 0 ? <button onClick={this.dateCond}>Search by Date</button> : ''}

          {this.state.dateShow === 1 ?
            <>
              <Flatpickr data-enable-time options={{ dateFormat: 'd-m-Y', clickOpens: true, defaultDate: null, defaultHour: 12, defaultMinute: 0, minDate: null, maxDate: null, enableTime: false, enableSeconds: false, time_24hr: false, noCalendar: false }}
                style={{ width: 200 }} className="textBox flatpickr-input" id="txtMeetingDate" placeholder="from" onChange={someFdate => { this.setState({ someFdate }, () => { this.timeFrom(someFdate) }) }}
              ></Flatpickr>

              <Flatpickr data-enable-time options={{ dateFormat: 'd-m-Y', clickOpens: true, defaultDate: null, defaultHour: 12, defaultMinute: 0, minDate: null, maxDate: null, enableTime: false, enableSeconds: false, time_24hr: false, noCalendar: false }}
                style={{ width: 200 }} className="textBox flatpickr-input" id="txtHistoryToDate" placeholder="to" onChange={someTdate => { this.setState({ someTdate }, () => { this.timeTo(someTdate) }) }}
              ></Flatpickr>

              <button onClick={this.handleTimeSearch}>OK</button>
            </> : ''}

          <MDBDataTable
            entries={15}
            entriesOptions={[15]}
            striped
            bordered
            small
            theadColor="indigo"
            searchLabel="Search by Name"
            data={datakp}
          />
        </div>

      </>
    )
  }
}

export default HomePage;
