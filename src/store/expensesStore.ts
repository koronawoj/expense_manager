import { action, computed, observable } from 'mobx';
import { string } from 'prop-types';

export interface IExpense {
  id: number;
  title: string;
  amount: number;
}
export interface ICurrenctRate {
  currencyRate: number;
  currency: string;
}

export class ExpensesStore {
  @observable
  public expensesList: IExpense[] = [];

  @observable
  // public currentRate: number = 4.382
  public currentRate: ICurrenctRate = {
    currency: 'EUR',
    currencyRate: 4.382,
  };

  @computed
  get expanseUnder100(): number {
    return this.expensesList.filter(expense => expense.amount < 100).length;
  }
  @computed
  get calculateTotal(): number {
    return this.expensesList.reduce((acc, cur) => acc + cur.amount, 0);
  }

  public calculateAmount(amount: number) {
    return computed(() => {
      return (amount / this.currentRate.currencyRate).toFixed(2);
    }).get();
  }

  @action
  public addExpanse(expense: IExpense) {
    this.expensesList.push(expense);
  }

  @action
  public deleteExpense(id: number) {
    this.expensesList = this.expensesList.filter(
      (expense: IExpense) => expense.id !== id
    );
  }
}
