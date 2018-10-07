import { observer } from 'mobx-react';
import * as React from 'react';
import { IExpense } from '../../store/expensesStore';
import {
  StyleCol,
  StyleColOptions,
  StyleListWrapper,
  StyleOption,
} from './ListExpenses.style';

interface IListExpenses {
  expenses: IExpense[];
  currentRate: {
    currencyRate: number;
    currency: string;
  };
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

interface IOption {
  deleteElem: (id: number) => void;
  onEdit: (id: number) => void;
  id: number;
}

const OptionsElem: React.SFC<IOption> = ({ deleteElem, onEdit, id }) => {
  const handleDelete = () => {
    deleteElem(id);
  };
  const handleEdit = () => {
    onEdit(id);
  };
  return (
    <StyleColOptions>
      <StyleOption delete={true} onClick={handleDelete}>
        DELETE
      </StyleOption>
      <StyleOption onClick={handleEdit}>EDIT</StyleOption>
    </StyleColOptions>
  );
};

@observer
export class ListExpenses extends React.PureComponent<IListExpenses> {
  public render() {
    return (
      <div>
        <StyleListWrapper header={true}>
          <div>
            <StyleCol flex={2}>Title</StyleCol>
                  <StyleCol onClick={() => console.log()}>Amount (PLN)</StyleCol>
            <StyleCol>Amount ({this.props.currentRate.currency})</StyleCol>
            <StyleCol>Options</StyleCol>
          </div>
        </StyleListWrapper>
        <StyleListWrapper>
          {this.props.expenses.map((expense: IExpense) => {
            return (
              <div key={expense.id}>
                <StyleCol flex={2}>{expense.title}</StyleCol>
                <StyleCol>{expense.amount}</StyleCol>
                <StyleCol>{this.calculateAmount(expense.amount)}</StyleCol>
                <OptionsElem
                  deleteElem={this.handleOnDelete}
                  onEdit={this.handleOnEdit}
                  id={expense.id}
                />
              </div>
            );
          })}
        </StyleListWrapper>
      </div>
    );
  }

  private calculateAmount = (amount: number) => {
    return (amount / this.props.currentRate.currencyRate).toFixed(2);
  };

  private handleOnDelete = (id: number): void => {
    this.props.onDelete(id);
  };

  private handleOnEdit = (id: number): void => {
    this.props.onEdit(id);
  };
}
