import JSCookie from 'js-cookie';

const TOKEN_KEY = 'tokens';
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const
};

export const getToken = async () => {
  try {
    if (typeof window === 'undefined') {
      // Read a cookie server-side
      return await require('next/headers').cookies().get(TOKEN_KEY)?.value;
    }
    return JSCookie.get(TOKEN_KEY) || null;
  } catch (e) {
    return null;
  }
};

export const setToken = (token: string) => {
  try {
    if (typeof window === 'undefined') {
      // Read a cookie server-side
      require('next/headers').cookies().set({
        name: "tokens",
        path: "/",
        // value: JSON.stringify(token),
        value: token,
      });
    }
    JSCookie.set(TOKEN_KEY, token, COOKIE_OPTIONS);
  } catch (e) {
    console.error('Failed to set token:', e);
  }
};

export const removeToken = () => {
  try {
    if (typeof window === 'undefined') {
      // Read a cookie server-side
      require('next/headers').cookies().remove(TOKEN_KEY);
    }
    JSCookie.remove(TOKEN_KEY);
  } catch (e) {
    console.error('Failed to remove token:', e);
  }
};

export const isAuthenticated = async () => {
  try {
    let token = ""
    if (typeof window === 'undefined') {
      // Read a cookie server-side
      token = require('next/headers').cookies().get(TOKEN_KEY)?.value;
    }
    token = await getToken();
    return !!token;
  } catch (e) {
    return false;
  }
}; 