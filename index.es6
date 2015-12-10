import React from 'react';
import Button from '@economist/component-link-button';
import enhanceWithClickOutside from 'react-click-outside';
/* eslint-disable no-console */
export default class Balloon extends React.Component {

  static get propTypes() {
    return {
      className: React.PropTypes.string,
      children: React.PropTypes.node,
      shadow: React.PropTypes.bool,
      balloonPosition: React.PropTypes.oneOf(['top', 'bottom']),
    };
  }

  static get defaultProps() {
    return {
      shadow: true,
      balloonPosition: 'bottom',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      visibility: 'not-visible',
    };
    this.props.children.forEach((child) => {
      if (child.type === 'a' || child.type.name === 'Button') {
        if (this.triggerLink) {
          console.log(`There is already a trigger link for this balloon,
          please change your children structure to have just one A tag`);
        } else {
          const className = `balloon__link${(typeof child.props.className !== `undefined`) ?
            ` ${child.props.className}` : `` }`;
          /* eslint-disable undefined see https://github.com/eslint/espree/issues/116 */
          const newProps = {
            ...child.props,
            className,
          };
          if (child.type === 'a') {
            this.triggerLink = (<a {...newProps}
              onClick={this.toggleState.bind(this)}
                                >
              {child.props.children}
            </a>);
          } else {
            this.triggerLink = (<Button {...newProps}
              onClick={this.toggleState.bind(this)}
                                >
              {child.props.children}
            </Button>);
          }
        }
      } else if (this.contentElements) {
        console.log(`There is already a content element for this balloon,
        please change your children structure to have just one non-A-tag
        element`);
      } else {
        this.contentElements = child;
      }
    });
  }

  handleClickOutside() {
    this.setState({
      visibility: 'not-visible',
    });
  }

  calculatePosition() {
    // Reset position before calculate the new position.
    this.setState({
      position: {},
    });
    const availableWidth = document.body.getBoundingClientRect().width;
    const balloon = this.refs.balloon;
    const balloonContent = this.refs.balloonContent;
    const balloonContentWidth = balloonContent.offsetWidth;
    const centerLeftOffsetBalloon = balloon.offsetLeft + balloon.offsetWidth/2;
    const centerRightOffsetBalloon = availableWidth - (balloon.offsetLeft + balloon.offsetWidth/2);
    let position = undefined;
    if (centerLeftOffsetBalloon<(balloonContentWidth/2)){
      // Put Ballon on the left or will be partially not visible.
      position = { left: 0 };
    } else if(centerRightOffsetBalloon<(balloonContentWidth/2)) {
      // Put Ballon on the right or will be partially not visible.
      position = { right: 0 };
    } else {
      // Center the Balloon, it will be totally visible.
      position = { left: Math.round((balloon.offsetWidth / 2) - (balloonContent.offsetWidth / 2)) };
    }
    return position;
  }

  toggleState(event) {
    event.stopPropagation();
    event.preventDefault();
    const visibility = (this.state.visibility === 'not-visible') ? 'visible' : 'not-visible';
    const position = (visibility === 'visible') ? this.calculatePosition() : {};
    this.setState({
      visibility,
      position,
    });
    // Required for preventDefault on Safari.
    return false;
  }

  render() {
    const className = (this.props.className) ? ` ${this.props.className}` : ``;
    const shadow = (this.props.shadow) ? ` balloon--shadow` : ``;
    return (
      <div ref="balloon" className={`balloon balloon--position-${this.props.balloonPosition} balloon--${this.state.visibility}${className}`}>
        {this.triggerLink}
        <div ref="balloonContent" className={`balloon-content ${shadow}`} style={this.state.position}>
          {this.contentElements}
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(Balloon);
