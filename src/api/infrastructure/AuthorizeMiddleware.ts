import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { UserAppService } from "src/application/app-service/UserAppService";
import { UserRequest } from "src/application/UserRequest";

 @Injectable()
 export class AuthorizeMiddleware implements NestMiddleware {
  constructor(private readonly _userAppService: UserAppService,
              private readonly _userRequest: UserRequest) {}

  async use(req: Request | any, res: Response, next: () => void) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    
    if (!bearerHeader || !accessToken) {
      return next();
    }

    try {
      let user = this._userAppService.verifyToken(accessToken);

      this._userRequest.userId = user.userId;
      this._userRequest.companyId = user.companyId;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      } else {
        throw new ForbiddenException('Token invalid!');
      }
    }

    next();
  }
 }