import * as React from 'react'

import {
  StyleAddExpensePanelWrapper,
  StyleRowInput,
  StyleButton,
  ErrorLabel,
} from './AddExpensePanel.style'
import { IExpense } from '../../store/expensesStore'
import { ReactElement, ReactEventHandler, ReactHTMLElement } from 'react'

interface IAddExpensePanelProps {
  onAddExpense: (expense: IExpense) => void
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
}

export class AddExpensePanel extends React.Component<
  IAddExpensePanelProps,
  IAddExpensePanelState
> {
  constructor(props: IAddExpensePanelProps) {
    super(props)
    this.state = {
      newExpense: {
        title: '',
        amount: '',
        id: 0,
      },
      error: {
        title: '',
        amount: '',
      },
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
        id: data.getTime(),
      })
    }
  }

  private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let regex = /^\d+\.?\d{0,2}$/
    if (
      (e.currentTarget.name === 'amount' &&
        regex.test(e.currentTarget.value)) ||
      e.currentTarget.name === 'title'
    ) {
      this.setState({
        newExpense: {
          ...this.state.newExpense,
          [e.currentTarget.name]: e.currentTarget.value,
        },
      })
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.handleOnChange(e)
              }
            />
          </StyleRowInput>
          <ErrorLabel>{this.state.error.amount}</ErrorLabel>
          <StyleRowInput>
            <div>Amount (in PLN)</div>
            <input
              type="text"
              name="amount"
              value={this.state.newExpense.amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.handleOnChange(e)
              }
            />
          </StyleRowInput>
        </div>
        <div>
          <StyleButton
            onClick={() => {
              this.handleAddExpense()
            }}
          >
            Add
          </StyleButton>
        </div>
      </StyleAddExpensePanelWrapper>
    )
  }
}
