import React from 'react';
import Button from '@economist/component-link-button';
import enhanceWithClickOutside from 'react-click-outside';
/* eslint-disable no-console */
export default class Balloon extends React.Component {

  static get propTypes() {
    return {
      className: React.PropTypes.string,
      children: React.PropTypes.node.isRequired,
      shadow: React.PropTypes.bool,
      balloonPosition: React.PropTypes.oneOf(['top', 'bottom']),
      unstyled: React.PropTypes.bool,
      prefix: React.PropTypes.string,
      showOnHover: React.PropTypes.bool,
      showOnHoverDelay: React.PropTypes.number,
    };
  }

  static get defaultProps() {
    return {
      shadow: true,
      balloonPosition: 'bottom',
      unstyled: false,
      prefix: 'balloon',
      showOnHoverDelay: 100,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      visibility: 'not-visible',
    };

    this.hoverHandlers = (this.props.showOnHover) ? {
      onMouseOver: this.changeVisibility.bind(this, 'visible'),
      onMouseOut: this.changeVisibility.bind(this, 'not-visible'),
    } : {};

    this.props.children.forEach((child) => {
      if (child.type === 'a' || child.type === Button) {
        if (this.triggerLink) {
          console.log(`There is already a trigger link for this balloon,
          please change your children structure to have just one A tag`);
        } else {
          const className = `${this.props.prefix}__link${(typeof child.props.className !== `undefined`) ?
            ` ${child.props.className}` : `` }`;
          /* eslint-disable undefined see https://github.com/eslint/espree/issues/116 */
          const newProps = {
            ...child.props,
            className,
            ...this.hoverHandlers,
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
    this.changeVisibility();
    // Required for preventDefault on Safari.
    return false;
  }

  changeVisibility(visibility) {
    if(!visibility){
      visibility = (this.state.visibility === 'not-visible') ? 'visible' : 'not-visible';
    }
    const position = (visibility === 'visible' && this.props.unstyled === false) ? this.calculatePosition() : {};
    this.setState({
      visibility,
      position,
    });
  }

  hoverHandler(visibility) {
    const self = this;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(
      () => {
        self.changeVisibility(visibility);
      },
      self.showOnHoverDelay
    );
  }

  render() {
    const className = (this.props.className) ? ` ${this.props.className}` : ``;
    const prefix = ` ${this.props.prefix}--`;
    const shadow = (this.props.shadow) ? ` ${prefix}shadow` : ``;
    const balloonDefaultClassname = (this.props.unstyled) ? '' : 'balloon ';
    const balloonContentDefaultClassname = (this.props.unstyled) ? 'content ' : 'balloon-content ';
    return (
      <div ref="balloon" className={`${balloonDefaultClassname}${prefix}position-${this.props.balloonPosition} ${prefix}${this.state.visibility}${className}`}>
        {this.triggerLink}
        <div
          ref="balloonContent"
          className={`${balloonContentDefaultClassname}${shadow}`}
          style={this.state.position}
          {...this.hoverHandlers}
        >
          {this.contentElements}
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(Balloon);
