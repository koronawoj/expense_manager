import * as React from 'react'
import { IExpense } from '../../store/expensesStore'
import {
  StyleListWrapper,
  StyleCol,
  StyleColDelete,
} from './ListExpenses.style'
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
        <StyleListWrapper header={true}>
          <div>
            <StyleCol flex={2}>Title</StyleCol>
            <StyleCol>Amount (PLN)</StyleCol>
            <StyleCol>Amount (EUR)</StyleCol>
            <StyleCol>Options</StyleCol>
          </div>
        </StyleListWrapper>
        <StyleListWrapper>
          {this.props.expenses.map((expense: IExpense) => {
            return (
              <div>
                <StyleCol flex={2}>{expense.title}</StyleCol>
                <StyleCol>{expense.amount}</StyleCol>
                <StyleCol>{this.calculateAmount(expense.amount)}</StyleCol>
                <StyleColDelete
                  delete={true}
                  onClick={() => {
                    this.props.onDelete(expense.id)
                  }}
                >
                  X
                </StyleColDelete>
              </div>
            )
          })}
        </StyleListWrapper>
      </div>
    )
  }
}
