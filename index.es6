import React from 'react';
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
          /* eslint-disable undefined see https://github.com/eslint/espree/issues/116 */
          const newProps = {
            ...self.props,
            className,
          };
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

  handleClickOutside() {
    this.setState({
      visibility: 'not-visible',
    });
  }

  toggleState(event) {
    event.stopPropagation();
    event.preventDefault();
    const visibility = (this.state.visibility === 'not-visible') ? 'visible' : 'not-visible';
    this.setState({
      visibility,
    });
    // Required for preventDefault on Safari.
    return false;
  }

  render() {
    const className = (this.props.className) ? ` ${this.props.className}` : ``;
    const shadow = (this.props.shadow) ? ` balloon--shadow` : ``;
    return (
      <div className={`balloon balloon--position-${this.props.balloonPosition} balloon--${this.state.visibility}${className}`}>
        {this.triggerLink}
        <div className={`balloon-content ${shadow}`}>
          {this.contentElements}
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(Balloon);
