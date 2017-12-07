import 'babel-polyfill';
import Balloon from '../src';
import React from 'react';
import chai from 'chai';
import Enzyme from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ExternalControlledBalloon } from '../src/example';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme()).should();

function mountBalloon(children) {
  return function (requiredProps) {
    return function (additionalProps) {
      return mount(
        <Balloon {...requiredProps} {...additionalProps}>
          {children}
        </Balloon>
      );
    };
  };
}

const requiredProps = {
  trigger: <a>Trigger link</a>,
};

const mountBalloonWithChildren = mountBalloon(<div>Content element</div>);
const mountBalloonWithProps = mountBalloonWithChildren(requiredProps);
describe('Balloon', () => {
  it('is compatible with React.Component', () => {
    Balloon.should.be.a('function').and.respondTo('render');
  });

  it('renders a React element', () => {
    React.isValidElement(<Balloon />).should.equal(true);
  });

  describe('Rendering', () => {
    it('it return the trigger before the content element', () => {
      const balloon = mountBalloonWithProps();
      balloon.should.have.exactly(1).descendants('a');
      balloon.find('a').should.have.text('Trigger link');
      balloon.childAt(0).should.have.tagName('div');
      balloon.find('.balloon-content').should.have.text('Content element');
    });
  });

  describe('Can be open and closed via API', () => {
    it('shows if visible prop is true', () => {
      const externalControledBalloon = mount(<ExternalControlledBalloon />);
      const trigger = externalControledBalloon.find('a');
      const balloon = externalControledBalloon.find(Balloon);
      trigger.simulate('click');
      balloon.should.have.className('custom-classname--visible');
      trigger.simulate('click');
      balloon.should.have.className('custom-classname--not-visible');
    });
  });

  it('should show onClick', () => {
    const balloon = mountBalloonWithProps();
    const trigger = balloon.find('a');
    trigger.simulate('mouseOver');
    balloon.should.have.className('balloon--not-visible');

    trigger.simulate('click');
    balloon.should.have.className('balloon--visible');
    balloon.find('.balloon__triangle').should.have.style('pointerEvents', 'none');

    trigger.simulate('click');
    balloon.should.have.className('balloon--not-visible');
  });

  it('should show onHover', () => {
    const balloon = mountBalloonWithProps({ showOnHover: true });
    const trigger = balloon.find('a');
    balloon.should.have.className('balloon--not-visible');

    trigger.simulate('mouseOver');
    balloon.should.have.className('balloon--visible');
    balloon.find('.balloon__triangle').should.have.style('pointerEvents', 'none');

    trigger.simulate('mouseOut');
    balloon.should.have.className('balloon--not-visible');
  });

  describe('Positioning', () => {
    let balloonElement = null;
    before(() => {
      balloonElement = mountBalloonWithProps() // eslint-disable-line no-underscore-dangle
        .instance().__wrappedComponent;
    });

    it('should return { left: 0 }', () => {
      const availableWidth = 400;
      const balloonDOM = { offsetWidth: 207, offsetLeft: 20 };
      const balloonContentDOM = { offsetWidth: 300 };
      balloonElement.calculatePosition(availableWidth, balloonDOM, balloonContentDOM).should.deep.equal({ left: 0 });
    });

    it('should return { right: 0 }', () => {
      const availableWidth = 400;
      const balloonDOM = { offsetWidth: 251, offsetLeft: 129 };
      const balloonContentDOM = { offsetWidth: 300 };
      balloonElement.calculatePosition(availableWidth, balloonDOM, balloonContentDOM).should.deep.equal({ right: 0 });
    });

    it('should return { left: -24 }', () => {
      const availableWidth = 863;
      const balloonDOM = { offsetWidth: 251, offsetLeft: 359 };
      const balloonContentDOM = { offsetWidth: 300 };
      balloonElement.calculatePosition(availableWidth, balloonDOM, balloonContentDOM).should.deep.equal({ left: -24 });
    });
  });
});
