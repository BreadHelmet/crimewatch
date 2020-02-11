import React from 'react';

export const EmailInput = ({ value, onChange, readOnly }) => (
  <label htmlFor="email">
    <span>Email</span>
    <input
      readOnly={readOnly}
      value={value}
      onChange={e => onChange(e.target.value)}
      type="email"
      name="email"
      id="email"
    />
  </label>
);

export default EmailInput;
