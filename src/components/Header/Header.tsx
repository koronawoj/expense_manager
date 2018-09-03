import * as React from 'react'
import {PureComponent} from 'react'
import {StyleHeaderWrapper, StyleHeaderText} from './Header.style'

interface IPropsHeader {
    currentRate: number
}

export class Header extends PureComponent<IPropsHeader> {
    render() {
        return (
                <StyleHeaderWrapper>
                    <StyleHeaderText font={"24px"}>List of expenses</StyleHeaderText>
                    <StyleHeaderText font={"14px"}>1EUR = {this.props.currentRate} PLN</StyleHeaderText>
                </StyleHeaderWrapper>
        )
    }
}
