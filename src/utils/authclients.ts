'use client';
import JSCookie from 'js-cookie';

const TOKEN_KEY = 'tokens';
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const
};

export const getTokenC = async () => {
  try {
    return JSCookie.get(TOKEN_KEY) || null;
  } catch (e) {
    return null;
  }
};

export const setTokenC = (token: string) => {
  try {
    JSCookie.set(TOKEN_KEY, token, COOKIE_OPTIONS);
  } catch (e) {
    console.error('Failed to set token:', e);
  }
};

export const removeTokenC = () => {
  try {
    JSCookie.remove(TOKEN_KEY);
  } catch (e) {
    console.error('Failed to remove token:', e);
  }
};

export const isAuthenticatedC = async () => {
  try {
    let token = null
    token = await getTokenC();
    return !!token;
  } catch (e) {
    return false;
  }
}; 