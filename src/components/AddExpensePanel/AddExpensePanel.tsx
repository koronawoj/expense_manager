import * as React from 'react';

import { Profiler } from 'inspector';
// import { ReactElement, ReactEventHandler, ReactHTMLElement } from 'react';
import { IExpense } from '../../store/expensesStore';
import {
  ErrorLabel,
  StyleAddExpensePanelWrapper,
  StyleButton,
  StyleRowInput,
  StyleSelect,
} from './AddExpensePanel.style';

interface IAddExpensePanelProps {
  onAddExpense: (expense: IExpense) => void;
  onChangeCurrencyRate: (currencyRate: number, currency: string) => void;
  editExpense: IExpense;
}

interface IAddExpensePanelState {
  newExpense: {
    title: string;
    amount: string;
    id: number;
  };
  error: {
    title: string;
    amount: string;
  };
  value: string;
}

export class AddExpensePanel extends React.Component<
  IAddExpensePanelProps,
  IAddExpensePanelState
> {
  private static getDerivedStateFromProps(
    nextProps: IAddExpensePanelProps,
    prevState: IAddExpensePanelState
  ): any {
    if (nextProps.editExpense.title) {
      return {
        newExpense: nextProps.editExpense,
      };
    }
  }
  private titleInput: React.RefObject<HTMLInputElement>;
  private amountInput: React.RefObject<HTMLInputElement>;
  private currencyList: {
    EUR: number;
    GBP: number;
    USD: number;
    CHF: number;
    [key: string]: number;
  };
  constructor(props: IAddExpensePanelProps) {
    super(props);
    this.state = {
      error: {
        amount: '',
        title: '',
      },
      newExpense: {
        amount: this.props.editExpense.amount
          ? this.props.editExpense.amount.toString()
          : '',
        id: this.props.editExpense.id || 0,
        title: this.props.editExpense.title || '',
      },
      value: 'EUR',
    };
    this.titleInput = React.createRef();
    this.amountInput = React.createRef();
    this.currencyList = {
      CHF: 3.828,
      EUR: 4.382,
      GBP: 4.779,
      USD: 3.724,
    };
  }

  public render() {
    return (
      <StyleAddExpensePanelWrapper>
        <div>
          <ErrorLabel>{this.state.error.title}</ErrorLabel>

          <StyleRowInput>
            <div>Title of transaction</div>
            <input
              type="text"
              name="title"
              value={this.state.newExpense.title}
              onChange={this.handleOnChange}
              onKeyDown={this.keyPress}
              ref={this.titleInput}
            />
          </StyleRowInput>
          <ErrorLabel>{this.state.error.amount}</ErrorLabel>
          <StyleRowInput>
            <div>Amount (in PLN)</div>
            <input
              type="text"
              name="amount"
              value={this.state.newExpense.amount}
              onChange={this.handleOnChange}
              onKeyDown={this.keyPress}
              ref={this.amountInput}
            />
          </StyleRowInput>
        </div>
        <div>
          <StyleSelect
            onChange={this.handleonSelectCurency}
            value={this.state.value}
          >
            <option value="EUR">1EUR = 4.382 PLN</option>
            <option value="GBP">1GBP = 4.779 PLN</option>
            <option value="USD">1USD = 3.724 PLN</option>
            <option value="CHF">1CHF = 3.828 PLN</option>
          </StyleSelect>
          <StyleButton onClick={this.handleAddExpense}>
            {this.state.newExpense.id ? 'Edit' : 'Add'}
          </StyleButton>
        </div>
      </StyleAddExpensePanelWrapper>
    );
  }

  private testInput = (title: string, amount: number) => {
    if (!isNaN(amount) && title.length >= 5) {
      this.setState({
        error: {
          amount: '',
          title: '',
        },
        newExpense: {
          amount: '',
          id: 0,
          title: '',
        },
      });
      return true;
    } else {
      this.setState({
        error: {
          amount: isNaN(amount) ? 'Please set correct amount!' : '',
          title:
            title.length < 5
              ? 'Please set longer title! (min 5 character)'
              : '',
        },
      });
      return false;
    }
  };

  private handleAddExpense = () => {
    const data = new Date();
    if (
      this.testInput(
        this.state.newExpense.title,
        parseFloat(this.state.newExpense.amount)
      )
    ) {
      this.props.onAddExpense({
        amount: parseFloat(this.state.newExpense.amount),
        id: this.state.newExpense.id || data.getTime(),
        title: this.state.newExpense.title,
      });
    }
  };

  private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^\d+\.?\d{0,2}$/;
    if (
      (e.currentTarget.name === 'amount' &&
        regex.test(e.currentTarget.value)) ||
      e.currentTarget.name === 'title' ||
      e.currentTarget.value === ''
    ) {
      this.setState({
        newExpense: {
          ...this.state.newExpense,
          [e.currentTarget.name]: e.currentTarget.value,
        },
      });
    }
  };

  private keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      if (
        !isNaN(parseFloat(this.state.newExpense.amount)) &&
        this.state.newExpense.title.length >= 5 &&
        this.titleInput.current
      ) {
        this.handleAddExpense();
        this.titleInput.current.focus();
        return;
      }
      if (this.state.newExpense.title.length >= 5 && this.amountInput.current) {
        this.amountInput.current.focus();
        return;
      }
      if (
        !isNaN(parseFloat(this.state.newExpense.amount)) &&
        this.titleInput.current
      ) {
        this.titleInput.current.focus();
        return;
      }
    }
  };
  private handleonSelectCurency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value) {
      this.setState({ value: e.currentTarget.value });
      this.props.onChangeCurrencyRate(
        this.currencyList[e.currentTarget.value],
        e.currentTarget.value
      );
    }
  };
}
