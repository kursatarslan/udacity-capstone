import { decode } from 'jsonwebtoken'

import { JwtPayload } from './JwtPayload'

/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
export function parseUserId(jwtToken: string): string {
  const decodedJwt = decode(jwtToken) as JwtPayload
  try {
    return decodedJwt.sub
  } catch (error) {
    return null
  } 
}


export function extractToken(authorization: string): string {
  try {
    const split = authorization.split(' ')
    const jwtToken = split[1]
    return jwtToken
  } catch (error) {
    return null
  } 
}