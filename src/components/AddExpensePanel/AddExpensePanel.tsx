import * as React from 'react'

import {
  StyleAddExpensePanelWrapper,
  StyleRowInput,
  StyleButton,
  ErrorLabel,
  StyleSelect,
} from './AddExpensePanel.style'
import { IExpense } from '../../store/expensesStore'
import { ReactElement, ReactEventHandler, ReactHTMLElement } from 'react'
import { Profiler } from 'inspector'

interface IAddExpensePanelProps {
  onAddExpense: (expense: IExpense) => void
  onChangeCurrencyRate: (currencyRate: number, currency: string) => void
  editExpense: IExpense
}

interface IAddExpensePanelState {
  newExpense: {
    title: string
    amount: string
    id: number
  }
  error: {
    title: string
    amount: string
  }
  value: string
}

export class AddExpensePanel extends React.Component<
  IAddExpensePanelProps,
  IAddExpensePanelState
> {
  private titleInput: React.RefObject<HTMLInputElement>
  private amountInput: React.RefObject<HTMLInputElement>
  private currencyList: {
    EUR: number
    GBP: number
    USD: number
    CHF: number
    [key: string]: number
  }
  constructor(props: IAddExpensePanelProps) {
    super(props)
    this.state = {
      newExpense: {
        title: this.props.editExpense.title || '',
        amount: this.props.editExpense.amount
          ? this.props.editExpense.amount.toString()
          : '',
        id: this.props.editExpense.id || 0,
      },
      error: {
        title: '',
        amount: '',
      },
      value: 'EUR',
    }
    this.titleInput = React.createRef()
    this.amountInput = React.createRef()
    this.currencyList = {
      EUR: 4.382,
      GBP: 4.779,
      USD: 3.724,
      CHF: 3.828,
    }
  }

  private static getDerivedStateFromProps(
    nextProps: IAddExpensePanelProps,
    prevState: IAddExpensePanelState
  ): any {
    if (nextProps.editExpense.title)
      return {
        newExpense: nextProps.editExpense,
      }
  }

  private testInput = (title: string, amount: number) => {
    if (!isNaN(amount) && title.length >= 5) {
      this.setState({
        newExpense: {
          title: '',
          amount: '',
          id: 0,
        },
        error: {
          amount: '',
          title: '',
        },
      })
      return true
    } else {
      this.setState({
        error: {
          amount: isNaN(amount) ? 'Please set correct amount!' : '',
          title:
            title.length < 5
              ? 'Please set longer title! (min 5 character)'
              : '',
        },
      })
      return false
    }
  }

  private handleAddExpense = () => {
    let data = new Date()
    if (
      this.testInput(
        this.state.newExpense.title,
        parseFloat(this.state.newExpense.amount)
      )
    ) {
      this.props.onAddExpense({
        title: this.state.newExpense.title,
        amount: parseFloat(this.state.newExpense.amount),
        id: this.state.newExpense.id || data.getTime(),
      })
    }
  }

  private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let regex = /^\d+\.?\d{0,2}$/
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
      })
    }
  }

  private keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode == 13) {
      if (
        !isNaN(parseFloat(this.state.newExpense.amount)) &&
        this.state.newExpense.title.length >= 5 &&
        this.titleInput.current
      ) {
        this.handleAddExpense()
        this.titleInput.current.focus()
        return
      }
      if (this.state.newExpense.title.length >= 5 && this.amountInput.current) {
        this.amountInput.current.focus()
        return
      }
      if (
        !isNaN(parseFloat(this.state.newExpense.amount)) &&
        this.titleInput.current
      ) {
        this.titleInput.current.focus()
        return
      }
    }
  }
  private handleonSelectCurency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value) {
      this.setState({ value: e.currentTarget.value })
      this.props.onChangeCurrencyRate(
        this.currencyList[e.currentTarget.value],
        e.currentTarget.value
      )
    }
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
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                this.keyPress(e)
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.handleOnChange(e)
              }
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
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                this.keyPress(e)
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.handleOnChange(e)
              }
              ref={this.amountInput}
            />
          </StyleRowInput>
        </div>
        <div>
          <StyleSelect
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              this.handleonSelectCurency(e)
            }}
            value={this.state.value}
          >
            <option value="EUR">1EUR = 4.382 PLN</option>
            <option value="GBP">1GBP = 4.779 PLN</option>
            <option value="USD">1USD = 3.724 PLN</option>
            <option value="CHF">1CHF = 3.828 PLN</option>
          </StyleSelect>
          <StyleButton
            onClick={() => {
              this.handleAddExpense()
            }}
          >
            {this.state.newExpense.id ? 'Edit' : 'Add'}
          </StyleButton>
        </div>
      </StyleAddExpensePanelWrapper>
    )
  }
}
