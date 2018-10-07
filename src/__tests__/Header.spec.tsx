import toJson from 'enzyme-to-json';
import * as React from 'react';

import { shallow } from 'enzyme';
import { Header } from '../components/Header';

const currentRate = {
  currency: 'PLN',
  currencyRate: 1.2,
};

it('renders the heading', () => {
  const result = shallow(<Header currentRate={currentRate} />);
  expect(toJson(result)).toMatchSnapshot();
});
