import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnClick() {
    this.props.onClick();
  }

  render () {
    return (
      <button className="button" onClick={this.handleOnClick.bind(this)}>
        {this.props.chilren}
      </button>
    );
  }
}

export default Button;
