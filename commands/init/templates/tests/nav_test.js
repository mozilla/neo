import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import routes from '../src/routes';
import { Nav } from '../src/nav';

const expect = chai.expect;

chai.use(chaiEnzyme());

describe('<Nav />', () => {

  it('contains the page title from supplied state', () => {
    const wrapper = shallow(<Nav title="Test" />);
    expect(wrapper.find('.navbar-brand').text()).to.equal('Test');
  });

  it('renders <Link> elements for all routes', () => {
    const wrapper = shallow(<Nav title="" />);
    expect(wrapper.find(Link)).to.have.length(routes.length);
  });

});
