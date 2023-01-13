import {
  CanActivate,
  ExecutionContext
} from "@nestjs/common";

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // returns true or false(null)
    return request.session.userId
  }
}