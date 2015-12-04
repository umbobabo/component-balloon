import React from 'react';
/* eslint-disable no-console */
export default class Balloon extends React.Component {

  static get propTypes() {
    return {
      className: React.PropTypes.string,
      children: React.PropTypes.node,
      shadow: React.PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      shadow: true,
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
          const className = `balloon__link${(typeof child.props.className !== `undefined`) ?
            ` ${child.props.className}` : `` }`;
          const newProps = Object.assign({}, this.props, { className });
          this.triggerLink = (<a {...newProps}
            onClick={this.toggleState.bind(self)}
                              >
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

  calculatePosition() {
    return Math.round((this.refs.balloon.offsetWidth / 2) - (this.refs.balloonContent.offsetWidth / 2));
  }

  toggleState(event) {
    event.stopPropagation();
    event.preventDefault();
    const visibility = (this.state.visibility === 'not-visible') ? 'visible' : 'not-visible';
    const position = (visibility === 'visible') ? this.calculatePosition() : this.state.position;
    this.setState({
      visibility,
      position,
    });
    // Required for preventDefault on Safari.
    return false;
  }

  // style={{ left: this.state.position }}
  render() {
    const className = (this.props.className) ? ` ${this.props.className}` : ``;
    const shadow = (this.props.shadow) ? ` balloon--shadow` : ``;
    return (
      <div ref="balloon" className={`balloon balloon--${this.state.visibility}${className}`}>
        {this.triggerLink}
        <div ref="balloonContent" className={`balloon-content${shadow}`}>
          {this.contentElements}
        </div>
      </div>
    );
  }
}
