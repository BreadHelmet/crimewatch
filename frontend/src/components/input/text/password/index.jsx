import React from 'react';

export const PasswordInput = ({ value, onChange, readOnly }) => (
  <label htmlFor="password">
    <span>Password</span>
    <input
      readOnly={readOnly}
      value={value}
      onChange={e => onChange(e.target.value)}
      type="password"
      name="password"
      id="password"
    />
  </label>
);

export default PasswordInput;
