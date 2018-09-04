import styled, { css } from 'react-emotion'

interface IListExpenses {
  font: string
}

const rowStandard = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    font-size: 16px;
    padding: 20px 5px;
    box-sizing: border-box;
    color: #ffffff;
    &:first-child {
      flex: 2;
    }
  }
`

export const StyleHeader = styled('div')`
  > div {
    display: flex;
    composes: ${rowStandard};
    background-color: #009eeb;
  }
`

export const StyleListWrapper = styled('div')`
  > div {
    display: flex;
    composes: ${rowStandard};
    background-color: #1fb6ff;
    margin-top: 2px;
    &:nth-child(odd) {
      background-color: #85d7ff;
    }
  }
`

// export const StyleHeaderText = styled('div')<IListExpenses>`
//   font-size: ${props => props.font};
// `
