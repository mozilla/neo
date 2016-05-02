import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import routes from '../src/routes';
import Nav from '../src/components/nav';

const expect = chai.expect;

chai.use(chaiEnzyme());

describe('<Nav />', () => {

  it('renders <Link> elements for all routes', () => {
    const wrapper = shallow(<Nav />);
    expect(wrapper.find(Link)).to.have.length(routes.length);
  });

});
