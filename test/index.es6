import Balloon from '../index.es6';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
/* eslint-disable newline-after-var */
describe(`A Balloon`, () => {
  describe(`it's a React component`, () => {
    it('is compatible with React.Component', () => {
      Balloon.should.be.a('function').and.respondTo('render');
    });
    it(`it's renders a React element`, () => {
      React.isValidElement(<Balloon/>).should.equal(true);
    });
    it(`it need a link and a content element`, () => {
      const shallowRenderer = TestUtils.createRenderer();
      const ballonHtml = (<Balloon>
        <a href="https://www.economist.com/user/login">
          TriggeLink
        </a>
        <div>
          BalloonContent
        </div>
      </Balloon>);
      shallowRenderer.render(ballonHtml);
      const balloon = shallowRenderer.getRenderOutput();
      const trigger = balloon.props.children[0];
      const content = balloon.props.children[1];

      balloon.props.className.should.equal('balloon balloon--not-visible');
      balloon.ref.should.equal('balloon');
      trigger.type.should.equal('a');
      trigger.props.children.should.equal('TriggeLink');
      trigger.props.href.should.equal('https://www.economist.com/user/login');
      trigger.props.onClick.name.should.equal('bound toggleState');
      content.type.should.not.equal('a');
      content.ref.should.equal('balloonContent');
      content.props.children.props.children.should.equal('BalloonContent');
      content.props.className.should.equal('balloon-content');
    });
  });
});
