export const SECRET = process.env.AUTH_SECRET || 'privateKey'
export const signOptions = {
  expiresIn: process.env.NODE_ENV === 'production' ? '10m' : '1h',
}
export const verifyOptions = {}
