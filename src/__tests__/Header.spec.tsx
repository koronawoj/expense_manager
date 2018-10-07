import * as React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { Header } from "../components/Header";

const currentRate = {
    currencyRate: 1.2,
    currency: 'PLN'
}

it("renders the heading", () => {
    const result = shallow(<Header currentRate={currentRate}/>);
    expect(toJson(result)).toMatchSnapshot();
});