// import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
// import JSCookie from 'js-cookie';
import { getToken } from './auth';

/**
 * Extract JWT token from different sources in Next.js
 * - Cookies
 * - Authorization header
 * - Query parameters
 */
export const extractJWTToken = async (req?: NextRequest): Promise<string | null> => {
  // Try to get from cookie first
  const tokenFromCookie = await getToken();
  if (tokenFromCookie) {
    return tokenFromCookie;
  }

  // If request object is provided, try Authorization header
  if (req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
  }
  return null;
};

/**
 * Decode JWT token without verifying signature
 */
export const decodeToken = (token: string) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Verify and decode JWT token
 */
export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

/**
 * Extract specific claim from JWT token
 */
export const extractClaim = (token: string, claimKey: string): any => {
  const decoded = decodeToken(token);
  if (decoded && typeof decoded === 'object') {
    return decoded[claimKey];
  }
  return null;
}; 