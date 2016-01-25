import Balloon from '../index.es6';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
/* eslint-disable newline-after-var */
describe(`A Balloon`, () => {
  describe(`it's a React component`, () => {
    it('is compatible with React.Component', () => {
      Balloon.should.be.a('function').and.respondTo('render');
    });
    it(`it return the trigger before the content element`, () => {
      const trigger = (<a>Trigger link</a>);
      const balloon = (<Balloon trigger={trigger}>
          <div>Content element</div>
        </Balloon>);
      balloon.props.trigger.type.should.equal('a');
      balloon.props.trigger.props.children.should.equal('Trigger link');
      balloon.props.children.type.should.equal('div');
      balloon.props.children.props.children.should.equal('Content element');
    });
  });
});
