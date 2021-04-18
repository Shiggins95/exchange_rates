// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Store from '../src/Redux/Reducers/index';

const store = createStore(Store);

export const findByTestAttribute = (component, attr) => component.find(`[data-test="${attr}"]`);

export const setup = (Component, props = {}) => {
  const renderedWithProvider = shallow(
    <Provider store={store}><Component data-test="component" {...props} /></Provider>,
  );
  return findByTestAttribute(renderedWithProvider, 'component');
};
