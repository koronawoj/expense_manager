import { observable, action, computed } from 'mobx'

export interface IExpense {
  id: number
  title: string
  amount: number
}

export class ExpensesStore {
  @observable
  public expensesList: IExpense[] = []

  @observable
  public currentRate: number = 4.382

  @computed
  get expanseUnder100(): number {
    return this.expensesList.filter(expense => expense.amount < 100).length
  }

  @action
  public addExpanse(title: string, amount: number, id: number) {
    this.expensesList.push({ title, amount, id })
  }

  @action
  public deleteExpense(id: number) {
    this.expensesList = this.expensesList.filter(
      (expense: IExpense) => expense.id !== id
    )
  }
}
