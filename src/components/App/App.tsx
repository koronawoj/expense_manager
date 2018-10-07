import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ExpensesStore, IExpense } from '../../store/expensesStore';
import { AddExpensePanel, Header, ListExpenses } from '../index';
import { StyleAppWrapper, StyleNoExpenses } from './App.style';

interface IListExpensesState {
  editExpense: IExpense;
}

@observer
export class App extends React.Component<{}, IListExpensesState> {
  private expensesStore: ExpensesStore = new ExpensesStore();

  constructor(props: {}) {
    super(props);
    this.state = {
      editExpense: {
        amount: 0,
        id: 0,
        title: '',
      },
    };
  }

  public render() {
    return (
      <StyleAppWrapper>
        <Header currentRate={this.expensesStore.currentRate} />
        <AddExpensePanel
          editExpense={this.state.editExpense}
          onAddExpense={this.handleAddExpense}
          onChangeCurrencyRate={this.handleChangeCurrentRate}
        />
        {this.expensesStore.expensesList.length > 0 ? (
          <>
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
          </>
        ) : (
          <StyleNoExpenses>
            <div>Add expense to render the list.</div>
          </StyleNoExpenses>
        )}
      </StyleAppWrapper>
    );
  }

  private handleDelete = (id: number) => {
    this.expensesStore.deleteExpense(id);
  };

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
            amount: 0,
            id: 0,
            title: '',
          },
        });
      }
    );
  };

  private handleAddExpense = (expense: IExpense) => {
    const index = this.expensesStore.expensesList.findIndex(
      (elem: IExpense) => elem.id === expense.id
    );
    if (index === -1) {
      this.expensesStore.addExpanse(expense);
    } else {
      this.expensesStore.expensesList[index] = expense;
    }
  };

  private handleChangeCurrentRate = (
    currencyRate: number,
    currency: string
  ) => {
    this.expensesStore.currentRate = {
      currency,
      currencyRate,
    };
  };
}
