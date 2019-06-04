import styled from "styled-components";
import React from 'react';

const Content = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
`;

const Card = ({ handlePay, item, handlePayment }) => {
  const payments = [10, 20, 50, 100, 500].map((amount, j) => (
    <label key={j}>
      <input
        type="radio"
        name="payment"
        onClick={() => handlePayment(amount)}
      />{" "}
      {amount}
    </label>
  ));

  return (
    <Content>
      <p>{item.name}</p>
      {payments}
      <button
        onClick={() => handlePay(item.id, item.curencys)}
      >
        Pay
      </button>
    </Content>
  );
};

export default Card;
