import styled, { css } from 'react-emotion';

interface IAddExpensePanel {
  font: string;
}

export const StyleAddExpensePanelWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 200px;
  & > div {
    box-sizing: border-box;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  & > div:first-child {
    flex: 3;
  }
  & > div:last-child {
    display: flex;
    justify-content: space-between;
    flex: 1;
    //height: 40px;
  }
  button {
    background: red;
    flex: 1;
    padding: 10px;
    border-radius: 10px;
  }
`;

export const StyleRowInput = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  margin: 0 0 10px 0;
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
  &:last-child {
    margin: 0;
  }
`;

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
  max-height: 60px;
  width: 100%;
  &:hover {
    background-color: #1fb6ff;
    color: #ffffff;
  }
`;

export const ErrorLabel = styled('div')`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  color: #ff0000;
  font-size: 12px;
  height: 20px;
`;
export const StyleSelect = styled('select')`
  outline: 0;
  box-shadow: none;
  border: 1px solid #1fb6ff;
  background-image: none;
  width: 100%;
  height: 25px;
  margin: 0;
  padding-left: 5px;
  cursor: pointer;
`;

// export const StyleHeaderText = styled('div')<IAddExpensePanel>`
//   font-size: ${props => props.font};
// `
