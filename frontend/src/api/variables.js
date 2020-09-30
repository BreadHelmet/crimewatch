
export const apiPath = 'http://localhost:8000';

export const AuthPath = {
  LOGIN: `${apiPath}/login`,
  REGISTER: `${apiPath}/register`,
};

export function authState() {
  const authState = Math.floor(Math.random() * 100000000000000 + 1).toString();
  localStorage.setItem('authState', authState);
  return authState;
}

export const JWT_SECONDS = 900000
