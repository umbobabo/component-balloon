import Balloon from '../src';
import React from 'react';
import chai from 'chai';
chai.should();
describe('Balloon', () => {
  it('is compatible with React.Component', () => {
    Balloon.should.be.a('function')
      .and.respondTo('render');
  });

  it('renders a React element', () => {
    React.isValidElement(<Balloon/>).should.equal(true);
  });

  describe('Rendering', () => {

    it('it return the trigger before the content element', () => {
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
