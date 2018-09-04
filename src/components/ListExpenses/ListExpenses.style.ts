import styled, { css } from 'react-emotion'

interface IListExpenses {
  header?: boolean
    flex?:number
    delete?:boolean
}

export const StyleListWrapper = styled('div')<IListExpenses>`
  > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
    background-color: ${props => props.header ? "#009eeb" : "#85d7ff"};
    margin-top: 2px;
    transition: 0.3s;
    &:nth-child(even) {
      background-color: #1fb6ff;
    }
    &:hover {
     background-color: ${props => props.header ? "#009eeb" : "#6aa6c1"};
    
    }
  } 
`

const myStyle = css`
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 20px 5px;
    box-sizing: border-box;
    color: #ffffff;
`

export const StyleCol = styled('div')<IListExpenses>`
    composes: ${myStyle};
        justify-content: flex-start;
    flex: ${props => props.flex ? props.flex  : "1"};

`

export const StyleColDelete = styled('div')<IListExpenses>`
    composes: ${myStyle};
    display: flex;
    justify-content: center;
    flex:1;
    cursor:pointer;
    transition: 0.3s;
    &:hover {
      background-color: #847171;
    }
`


// export const StyleHeaderText = styled('div')<IListExpenses>`
//   font-size: ${props => props.font};
// `
