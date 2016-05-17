import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import About from '../src/about';

const expect = chai.expect;

chai.use(chaiEnzyme());

describe('<About />', () => {

  it(`renders an H1 with "About" content`, () => {
    const wrapper = shallow(<About />);
    const h1 = wrapper.find('h1');

    expect(h1).to.have.length(1);
    expect(h1.text()).to.equal('About');
  });

});
