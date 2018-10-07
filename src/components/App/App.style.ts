import styled, { css } from 'react-emotion';

export const StyleAppWrapper = styled('div')`
  margin: 0 auto;
  max-width: 1200px;
  box-sizing: border-box;
  padding: 20px;
`;

export const StyleNoExpenses = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  div {
    padding: 20px 100px;
    border: 1px solid #1fb6ff;
  }
`;
