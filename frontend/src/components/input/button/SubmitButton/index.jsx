import React from 'react';
import LoadingIndicator from '../../../LoadingIndicator';

export const SubmitButton = ({ loading, onClick }) => (
  <button
    disabled={loading}
    onClick={onClick}
    type="submit"
  >
    Login
    <LoadingIndicator />
  </button>
);

export default SubmitButton;
