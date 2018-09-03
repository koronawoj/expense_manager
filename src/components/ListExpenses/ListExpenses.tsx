import * as React from 'react'
import { IExpense } from '../../store/expensesStore'
import { StyleHeader, StyleListWrapper } from './ListExpenses.style'
import { observer } from 'mobx-react'

interface IListExpenses {
  expenses: IExpense[]
  currentRate: number
  onDelete: (id: number) => void
}

@observer
export class ListExpenses extends React.PureComponent<IListExpenses> {
  private calculateAmount = (amount: number) => {
    return (amount / this.props.currentRate).toFixed(2)
  }

  public render() {
    return (
      <div>
        <StyleHeader>
          <div>
            <div>Title</div>
            <div>Amount (PLN)</div>
            <div>Amount (EUR)</div>
            <div>Options</div>
          </div>
        </StyleHeader>
        <StyleListWrapper>
          {this.props.expenses.map((expense: IExpense) => {
            return (
              <div>
                <div>{expense.title}</div>
                <div>{expense.amount}</div>
                <div>{this.calculateAmount(expense.amount)}</div>
                <div
                  onClick={() => {
                    this.props.onDelete(expense.id)
                  }}
                >
                  X
                </div>
              </div>
            )
          })}
        </StyleListWrapper>
      </div>
    )
  }
}
