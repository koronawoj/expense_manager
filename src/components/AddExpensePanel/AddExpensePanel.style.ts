import styled, { css } from 'react-emotion'

interface IAddExpensePanel {
  font: string
}

export const StyleAddExpensePanelWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  & > div {
    box-sizing: border-box;
    padding: 20px;
  }
  & > div:first-child {
    flex: 3;
  }
  & > div:last-child {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex: 1;
  }
  button {
    background: red;
    flex: 1;
    padding: 10px;
    border-radius: 10px;
  }
`

export const StyleRowInput = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  margin: 10px 0;
  div {
    flex: 1;
  }
  input {
    flex: 2;
    padding: 10px 10px;
    font-size: 14px;
    border: 1px solid gray;
    &:focus {
      outline: none;
      border: 1px solid #1fb6ff;
    }
  }
`

export const StyleButton = styled('div')`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 10px;
  font-size: 20px;
  box-sizing: border-box;
  border: 1px solid #1fb6ff;
  background-color: white;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #1fb6ff;
    color: #ffffff;
  }
`

// export const StyleHeaderText = styled('div')<IAddExpensePanel>`
//   font-size: ${props => props.font};
// `
