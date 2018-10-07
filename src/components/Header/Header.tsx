import * as React from 'react';
import { StyleHeaderText, StyleHeaderWrapper } from './Header.style';

interface IPropsHeader {
  currentRate: {
    currencyRate: number;
    currency: string;
  };
}

export class Header extends React.PureComponent<IPropsHeader> {
  public render() {
    const variable = 4;
    return (
      <StyleHeaderWrapper>
        <StyleHeaderText font={'24px'}>List of expenses</StyleHeaderText>
        <StyleHeaderText font={'14px'}>
          1{this.props.currentRate.currency} ={' '}
          {this.props.currentRate.currencyRate} PLN
        </StyleHeaderText>
      </StyleHeaderWrapper>
    );
  }
}
