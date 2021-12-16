import { AuthUserFromToken } from './../services/auth/strategy/auth-user.model';
import { Request } from 'express';

export function getAuthUserFromAuthGuard(req: Request): AuthUserFromToken {
  /**
   * Where did the property `user` come from?
   * Thanks to the decorator `@UseGuards(AuthGuard('jwt'))`
   * The middleware validates the token that was passed then
   * returns the associated `user` information into `req.user` property.
   */
  return req.user as AuthUserFromToken;
}
