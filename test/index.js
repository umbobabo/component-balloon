import Balloon from '../src';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
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

  describe('Positioning', () => {
    let balloonElement = null;

    before(() => {
      const triggerElement = (<a>Trigger link</a>);
      balloonElement = TestUtils.renderIntoDocument(
        <Balloon trigger={triggerElement}>
          <div>Content element</div>
        </Balloon>
      );
    });

    it('should return { left: 0 }', () => {
      const availableWidth = 400;
      const balloonDOM = { offsetWidth: 207, offsetLeft: 20 };
      const balloonContentDOM = { offsetWidth: 300 };

      balloonElement.
        __wrappedComponent
        .calculatePosition(availableWidth, balloonDOM, balloonContentDOM)
        .should.deep.equal({ left: 0 });
    });

    it('should return { right: 0 }', () => {
      const availableWidth = 400;
      const balloonDOM = { offsetWidth: 251, offsetLeft: 129 };
      const balloonContentDOM = { offsetWidth: 300 };

      balloonElement.
        __wrappedComponent
        .calculatePosition(availableWidth, balloonDOM, balloonContentDOM)
        .should.deep.equal({ right: 0 });
    });

    it('should return { left: -24 }', () => {
      const availableWidth = 863;
      const balloonDOM = { offsetWidth: 251, offsetLeft: 359 };
      const balloonContentDOM = { offsetWidth: 300 };

      balloonElement.
        __wrappedComponent
        .calculatePosition(availableWidth, balloonDOM, balloonContentDOM)
        .should.deep.equal({ left: -24 });
    });
  });


});
