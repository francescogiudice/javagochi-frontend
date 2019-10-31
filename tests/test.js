import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import RegistrationForm from '../src/containers/Signup';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16'
import { act } from 'react-dom/test-utils';


Enzyme.configure({adapter: new Adapter()})

function shallowSetup() {

  //Sample props to pass to our shallow render
  const props = {
    loading: false,
    error: undefined,
    authSignup: jest.fn()
  }

  // wrapper instance around rendered output
  const enzymeWrapper = shallow(<RegistrationForm />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Shallow rendered', () => {
  it('should render a card with the details', () => {
    // Setup wrapper and assign props.
    const { enzymeWrapper, props } = shallowSetup();

    // enzymeWrapper.find(selector) : Find every node in the render tree that matches the provided selector.
    expect(enzymeWrapper.find('password'));
  });
});
