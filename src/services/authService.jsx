export const tokenKey = "token";

export const AuthService = {
  setToken: (token, remember = false) => {
    if (remember) {
      localStorage.setItem(tokenKey, token);
    } else {
      sessionStorage.setItem(tokenKey, token);
    }
  },

  getToken: () => localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey),

  clearToken: () => {
    localStorage.removeItem(tokenKey);
    sessionStorage.removeItem(tokenKey);
  },
};
