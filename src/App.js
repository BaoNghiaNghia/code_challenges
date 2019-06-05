import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../src/components/Card';
import { getCharities } from './api/CharitiesApi'
import { getPayments, payment } from './api/PaymentsApi'
import { summaryDonations } from './helpers';
import * as action from './reducers/action'

const style = {
  color: 'red',
  margin: '1em 0',
  fontWeight: 'bold',
  fontSize: '16px',
  textAlign: 'center'
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      charities: [],
      selectedAmount: 10
    };
  }

  async componentDidMount() {
    const charities = await getCharities()
    this.setState({charities})
    const payments = await getPayments()
    this.props.updateTotalDonate(summaryDonations(payments.filter((item) => item.amount).map(item => item.amount)))
  }

  handlePayment = (amount) => {
    this.setState({ selectedAmount: amount })
  }

  handlePay = async (id, curency) => {
    const { selectedAmount } = this.state
    await payment({ id, amount: selectedAmount, curency})
    console.log(selectedAmount)
    this.props.updateTotalDonate(selectedAmount)
    this.props.updateMessage(`Thanks for donate ${selectedAmount}!`);
    clearTimeout()
    setTimeout(() => {
      this.props.updateMessage(``);
    }, 2000);
  }

  render() {
    const { donate, message } = this.props;
    return (
      <div>
        <h1>Tamboon React</h1>
        <p>All donations: {donate}</p>
        <p style={style}>{message}</p>
        {
          this.state.charities.map((item, i) =>
            <Card key={i} item={item} handlePay={this.handlePay} handlePayment={this.handlePayment} />
          )
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateTotalDonate: (payments) => dispatch(action.updateDonate(payments)),
  updateMessage: (message) => dispatch(action.updateMessage(message))
})

const mapStateToProps = state => ({
  donate: state.donate ,
  message: state.message
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
