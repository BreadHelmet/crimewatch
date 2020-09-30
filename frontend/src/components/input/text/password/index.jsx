import React from 'react';

export const PasswordInput = ({ value, onChange, readOnly, onEnter }) => (
  <label htmlFor="password">
    <span>Password</span>
    <input
      readOnly={readOnly}
      value={value}
      onChange={e => onChange(e.target.value)}
      type="password"
      name="password"
      id="password"
      onKeyUp={e => {
        if (e.key === 'Enter') {
          onEnter();
        }
      }}
    />
  </label>
);

export default PasswordInput;
