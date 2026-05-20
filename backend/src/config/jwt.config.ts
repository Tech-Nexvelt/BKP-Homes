import { env } from './env';

export const jwtConfig = {
  secret: env.JWT_SECRET,
  refreshSecret: env.JWT_REFRESH_SECRET,
  expiresIn: env.JWT_EXPIRES_IN,
  refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
  refreshExpiresInMs: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};
