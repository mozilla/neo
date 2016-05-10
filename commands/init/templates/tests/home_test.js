import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import Home from '../src/home';

const expect = chai.expect;

chai.use(chaiEnzyme());

describe('<Home />', () => {

  it(`renders an H1 with "Home" content`, () => {
    const wrapper = shallow(<Home />);
    const h1 = wrapper.find('h1');

    expect(h1).to.have.length(1);
    expect(h1.text()).to.equal('Home');
  });

});
