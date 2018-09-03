import * as React from 'react'

import {
  StyleAddExpensePanelWrapper,
  StyleRowInput,
  StyleButton,
} from './AddExpensePanel.style'

interface IAddExpensePanel {}

export class AddExpensePanel extends React.PureComponent {
  public render() {
    return (
      <StyleAddExpensePanelWrapper>
        <div>
          <StyleRowInput>
            <div>Title of transaction</div>
            <input type="text" />
          </StyleRowInput>
          <StyleRowInput>
            <div>Amount (in PLN)</div>
            <input type="text" />
          </StyleRowInput>
        </div>
        <div>
          <StyleButton>Add</StyleButton>
        </div>
      </StyleAddExpensePanelWrapper>
    )
  }
}
