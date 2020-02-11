import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Input extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { id, className, readOnly, value, onChange } = this.props;
    return (
      <label className={className}>
        <span>{id}</span>
        <input
          readOnly={readOnly}
          value={value}
          onChange={e => onChange(e.target.value)}
          name={id}
          id={id}
        />
      </label>
    );
  }
}

export default Input;
