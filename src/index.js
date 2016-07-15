import React from 'react';
import classNames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
/* eslint-disable no-console */
export default class Balloon extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    children: React.PropTypes.node,
    shadow: React.PropTypes.bool,
    balloonPosition: React.PropTypes.oneOf([ 'top', 'bottom' ]),
    unstyled: React.PropTypes.bool,
    prefix: React.PropTypes.string,
    showOnHover: React.PropTypes.bool,
    showOnHoverDelay: React.PropTypes.number,
    dynamicPositioning: React.PropTypes.bool,
    trigger: React.PropTypes.element.isRequired,
  }

  static defaultProps = {
    dynamicPositioning: true,
    shadow: true,
    balloonPosition: 'bottom',
    unstyled: false,
    prefix: 'balloon',
    showOnHoverDelay: 100,
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
    this.toggleState = this.toggleState.bind(this);
  }

  handleClickOutside() {
    this.setState({
      visibility: 'not-visible',
    });
  }

  calculatePosition(availableWidth, balloon, balloonContent) {
    const balloonContentWidth = balloonContent.offsetWidth;
    const TWO = 2;
    const halfBalloonWidth = balloon.offsetWidth / TWO;
    const halfBalloonContentWidth = balloonContentWidth / TWO;
    const centerLeftOffsetBalloon = balloon.offsetLeft + halfBalloonWidth;
    const centerRightOffsetBalloon = availableWidth - (balloon.offsetLeft + balloon.offsetWidth / TWO);
    const position = {};
    if (centerLeftOffsetBalloon < halfBalloonContentWidth) {
      // Put Ballon on the left or will be partially not visible.
      position.left = 0;
    } else if (centerRightOffsetBalloon < halfBalloonContentWidth) {
      // Put Ballon on the right or will be partially not visible.
      position.right = 0;
    } else {
      // Center the Balloon, it will be totally visible.
      position.left = Math.round(halfBalloonWidth - halfBalloonContentWidth);
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
    const { dynamicPositioning, unstyled } = this.props;
    if (!visibility) {
      visibility = (this.state.visibility === 'not-visible') ? 'visible' : 'not-visible';
    }
    const position = (visibility === 'visible' && unstyled === false && dynamicPositioning) ?
      this.calculatePosition(
        document.body.getBoundingClientRect().width,
        this.refs.balloon,
        this.refs.balloonContent
      ) :
      {};
    this.setState({
      visibility,
      position,
    }, () => {
      if (visibility === 'visible') {
        this.refs.balloonContent.focus();
      }
    });
  }

  render() {
    const { trigger, className } = this.props;
    const { type: TriggerLink, className: triggerClassName, props: triggerProps } = trigger;
    /* eslint-disable undefined see https://github.com/eslint/espree/issues/116 */
    const triggerLinkNewProps = {
      className: `${ this.props.prefix }__link${ triggerClassName ? ` ${ triggerClassName }` : '' }`,
      onClick: this.toggleState,
      ...triggerProps,
      ...this.hoverHandlers,
    };
    const prefix = `${ this.props.prefix }--`;
    const balloonContentClassname = (this.props.unstyled) ? 'content' : 'balloon-content';
    const triangleShouldDisplay = this.state.visibility === 'visible' && !this.props.unstyled;
    const rootClassNames = classNames(
      `${ prefix }position-${ this.props.balloonPosition }`,
      `${ prefix }${ this.state.visibility }`,
      className,
      {
        balloon: !this.props.unstyled,
      }
    );
    const contentClassNames = classNames(
      balloonContentClassname,
      {
        [`${ prefix }shadow`]: this.props.shadow,
      }
    );
    let triangleElement = null;
    if (triangleShouldDisplay) {
      triangleElement = (<div className="balloon__triangle" style={{ pointerEvents: 'none' }} />);
    }
    return (
      <div ref="balloon" className={rootClassNames}>
        <span style={{ position: 'relative' }}>
          {triangleElement}
          <TriggerLink {...triggerLinkNewProps} />
        </span>
        <div
          ref="balloonContent"
          className={contentClassNames}
          style={this.state.position}
          {...this.hoverHandlers}
          tabIndex="0"
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(Balloon);
