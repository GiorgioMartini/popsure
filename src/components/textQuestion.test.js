import React from 'react';
import { shallow, mount } from 'enzyme';
import TextQuestion from './textQuestion';
import {BrowserRouter as Router} from 'react-router-dom';

const props = {
  question: 'question', 
  next: 'next', 
  setAnswer: jest.fn(), 
  actionType: 'actionType', 
  state: {}, 
  value: 'value',
}

it('should render question correctly', () => {
  const wrapper = mount(
    <Router>
      <TextQuestion {...props} />
    </Router>
    );
  const textQuestion = wrapper.find('TextQuestion');
  const p = textQuestion.find('.question')
  expect(p.text()).toBe(props.question)
});
