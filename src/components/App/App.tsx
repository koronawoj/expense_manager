import * as React from 'react'
import { observer } from 'mobx-react'
import { Header, AddExpensePanel, ListExpenses } from '../index'
import { StyleAppWrapper } from './App.style'
import { IExpense, ExpensesStore } from '../../store/expensesStore'
import { toJS } from 'mobx'

interface IListExpensesProps {}
interface IListExpensesState {
  editExpense: IExpense
}

@observer
export class App extends React.Component<
  IListExpensesProps,
  IListExpensesState
> {
  private expensesStore: ExpensesStore = new ExpensesStore()

  private handleDelete = (id: number) => {
    this.expensesStore.deleteExpense(id)
  }

  private handleEdit = (id: number) => {
    this.setState(
      {
        editExpense: toJS(
          this.expensesStore.expensesList.filter(
            (elem: IExpense) => elem.id === id
          )[0]
        ),
      },
      () => {
        this.setState({
          editExpense: {
            id: 0,
            title: '',
            amount: 0,
          },
        })
      }
    )
  }

  private handleAddExpense = (expense: IExpense) => {
    let index = this.expensesStore.expensesList.findIndex(
      (elem: IExpense) => elem.id === expense.id
    )
    if (index === -1) {
      this.expensesStore.addExpanse(expense)
    } else {
      this.expensesStore.expensesList[index] = expense
    }
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

  constructor(props: {}) {
    super(props)
    this.state = {
      editExpense: {
        id: 0,
        title: '',
        amount: 0,
      },
    }
  }

  public render() {
    console.log(this.state.editExpense)
    return (
      <StyleAppWrapper>
        <Header currentRate={this.expensesStore.currentRate} />
        <AddExpensePanel
          editExpense={this.state.editExpense}
          onAddExpense={this.handleAddExpense}
          onChangeCurrencyRate={this.handleChangeCurrentRate}
        />
        <ListExpenses
          expenses={this.expensesStore.expensesList}
          currentRate={this.expensesStore.currentRate}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
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
