import * as React from 'react'
import { Provider, observer } from 'mobx-react'
import { Header, AddExpensePanel, ListExpenses } from '../index'
import { StyleAppWrapper } from './App.style'
import { IExpense, ExpensesStore } from '../../store/expensesStore'

@observer
export class App extends React.Component {
  private expensesStore: ExpensesStore = new ExpensesStore()

  private handleDelete = (id: number) => {
    this.expensesStore.deleteExpense(id)
  }
  private handleAddExpense = (expense: IExpense) => {
    this.expensesStore.addExpanse(expense)
  }

  private handleChangeCurrentRate = (
    currencyRate: number,
    currency: string
  ) => {
    this.expensesStore.currentRate = {
      currencyRate,
      currency,
    }
  }

  public render() {
    return (
      <StyleAppWrapper>
        <Header currentRate={this.expensesStore.currentRate} />
        <AddExpensePanel
          onAddExpense={this.handleAddExpense}
          onChangeCurrencyRate={this.handleChangeCurrentRate}
        />
        <ListExpenses
          expenses={this.expensesStore.expensesList}
          currentRate={this.expensesStore.currentRate}
          onDelete={this.handleDelete}
        />
        <div>
          Sum: {this.expensesStore.calculateTotal} (
          {this.expensesStore.calculateAmount(
            this.expensesStore.calculateTotal
          )}{' '}
          {this.expensesStore.currentRate.currency})
        </div>
      </StyleAppWrapper>
    )
  }
}
