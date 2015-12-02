import React from 'react';
/* eslint-disable no-console */
export default class Balloon extends React.Component {

  static get propTypes() {
    return {
      className: React.PropTypes.string,
      children: React.PropTypes.node,
    };
  }

  constructor(props) {
    super(props);
    const self = this;
    this.state = {
      visibility: 'not-visible',
    };
    this.props.children.map((child) => {
      if (child.type === 'a') {
        if (this.triggerLink) {
          console.log(`There is already a trigger link for this balloon,
          please change your children structure to have just one A tag`);
        } else {
          this.triggerLink = (<a {...child.props} onClick={this.toggleState.bind(self)}>
            {child.props.children}
          </a>);
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

  calculateCentering() {
    return Math.round((this.refs.balloon.offsetWidth / 2) - (this.refs.balloonContent.offsetWidth / 2));
  }

  toggleState(event) {
    event.stopPropagation();
    event.preventDefault();
    const visibility = (this.state.visibility === 'not-visible') ? 'visible' : 'not-visible';
    const position = (visibility === 'visible') ? this.calculateCentering() : this.state.position;
    this.setState({
      visibility,
      position,
    });
    // Required for preventDefault on Safari.
    return false;
  }

  render() {
    const className = (this.props.className) ? ` ${this.props.className}` : ``;
    return (
      <div ref="balloon" className={`balloon balloon--${this.state.visibility}${className}`}>
        {this.triggerLink}
        <div ref="balloonContent" className="balloon-content" style={{ left: this.state.position }}>
          {this.contentElements}
        </div>
      </div>
    );
  }
}
