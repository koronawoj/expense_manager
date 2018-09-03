import styled, { css } from 'react-emotion';

interface IHeader {
    font: string
}

export const StyleHeaderWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const StyleHeaderText = styled('div')<IHeader>`
  font-size: ${props => props.font};
`