import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import QuizCorrect from './QuizCorrect';

describe('<QuizCorrect />', () => {
  it('renders', () => {
    const wrapper = shallow(
      <QuizCorrect
        word={{english: 'banana', phonetic: 'moz', persian: 'moz!'}}
        fromLang="english"
        toLang="persian"
      />
    );
    expect(wrapper).toExist();
  });
});