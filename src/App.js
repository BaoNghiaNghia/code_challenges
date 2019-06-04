import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Card from "../src/components/Card";
import fetch from "isomorphic-fetch";

import { summaryDonations } from "./helpers";

const style = {
  color: "red",
  margin: "1em 0",
  fontWeight: "bold",
  fontSize: "16px",
  textAlign: "center"
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      charities: [],
      selectedAmount: 10
    };
  }

  componentDidMount() {
    const self = this
    fetch("http://localhost:3001/charities")
      .then(function(resp) {
        return resp.json();
      })
      .then(function(data) {
        self.setState({ charities: data });
      });

    fetch("http://localhost:3001/payments")
      .then(function(resp) {
        return resp.json();
      })
      .then(function(data) {
        self.props.dispatch({
          type: "UPDATE_TOTAL_DONATE",
          payload: summaryDonations(data.filter(item => item.amount).map(item => item.amount))
        });
      });
  }

  handlePayment = (amount) => {
    this.setState({ selectedAmount: amount })
  }

  handlePay = (id, currency) => {
    const { selectedAmount } = this.state
    fetch("http://localhost:3001/payments", {
      method: "POST",
      body: `{ "charitiesId": ${id}, "amount": ${selectedAmount}, "currency": "${currency}" }`
    })
      .then(resp => resp.json())
      .then(() => {
        this.props.dispatch({
          type: "UPDATE_TOTAL_DONATE",
          payload: selectedAmount
        });
        this.props.dispatch({
          type: "UPDATE_MESSAGE",
          message: `Thanks for donate ${selectedAmount}!`
        });

        setTimeout(() => {
          this.props.dispatch({
            type: "UPDATE_MESSAGE",
            message: ""
          });
        }, 2000);
      });
  }

  render() {
   
    const donate = this.props.donate;
    const message = this.props.message;

    return (
      <div>
        <h1>Tamboon React</h1>
        <p>All donations: {donate}</p>
        <p style={style}>{message}</p>
        { 
          this.state.charities.map((item, i) => 
            <Card key={i} item={item} handlePay={this.handlePay} handlePayment={this.handlePayment} />
          )}
      </div>
    );
  }
}

export default connect(state => state)(App);