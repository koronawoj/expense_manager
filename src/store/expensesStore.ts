import { observable, action, computed } from 'mobx'

export interface Expense {
    id: number
    title: string
    amount: number
}

export class ExpensesStore {
    @observable expensesList: Expense[] = [];

    @observable currentRate: number = 4.382;

    @computed
    get expanseUnder100(): number {
        return this.expensesList.filter((expense) => expense.amount < 100).length
    }

    @action
    addExpanse(title: string, amount: number, id: number) {
        this.expensesList.push({ title, amount, id })
    }

    @action
    deleteExpense(id: number) {
        this.expensesList = this.expensesList.filter((expense:Expense) => expense.id !== id)
    }
}
