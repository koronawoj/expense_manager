import * as React from 'react'
import { Provider, observer } from 'mobx-react'
import { Header, AddExpensePanel } from '../index'
import { StyleAppWrapper } from './App.style'
import { IExpense, ExpensesStore } from '../../store/expensesStore'

@observer
export class App extends React.Component {
  private expensesStore: ExpensesStore = new ExpensesStore()

  private handleDelete = (id: number) => {
    this.expensesStore.deleteExpense(id)
  }

  private calculateAmount = (amount: number) => {
    return (amount / 4).toFixed(2)
  }

  public render() {
    return (
      <StyleAppWrapper>
        <Header currentRate={this.expensesStore.currentRate} />
        <AddExpensePanel />
        {/*<ListExpenses/>*/}
        {/*<div>Expenses: {this.expensesStore.expensesList.length}</div>*/}
        {/*<button onClick={() => {*/}
        {/*let date = new Date()*/}
        {/*this.expensesStore.addExpanse('TitleBig', 123, date.getTime())*/}
        {/*}}>Big num*/}
        {/*</button>*/}
        {/*<button onClick={() => {*/}
        {/*let date = new Date()*/}
        {/*this.expensesStore.addExpanse('TitleSmall', 23, date.getTime())*/}
        {/*}}>Small num*/}
        {/*</button>*/}
        {/*<div>List: {this.expensesStore.expensesList.length}</div>*/}
        {/*<div>Small: {this.expensesStore.expanseUnder100}</div>*/}
        {/*<div>Big: {this.expensesStore.expensesList.length - this.expensesStore.expanseUnder100}</div>*/}
        {/*{this.expensesStore.expensesList.map((expense) => (*/}
        {/*<div key={expense.id}>*/}
        {/*<span>{expense.title} - {expense.amount} - {this.calculateAmount(expense.amount)}</span>*/}
        {/*<span onClick={() => {*/}
        {/*this.handleDelete(expense.id)*/}
        {/*}}>X</span></div>*/}
        {/*))}*/}
      </StyleAppWrapper>
    )
  }
}
{
  /*<Provider todoStore={this.todoStore}>*/
}
{
  /*<div>*/
}
{
  /*<TodoAdd />*/
}
{
  /*<TodoList />*/
}
{
  /*</div>*/
}
{
  /*</Provider>*/
}