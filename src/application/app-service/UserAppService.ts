import { Injectable, Scope } from "@nestjs/common";
import { AccessTokenPayload } from "src/base/model/AccessTokenPayload";
import { UserDomainService } from "src/domain-service/UserDomainService";
import { User } from "src/shared/entity/User";
import { UnitOfWork } from "src/typeorm/UnitOfWork";
import { Transaction } from "../decorator/TransactionDecorator";
import { UserDto } from "../dto/UserDto";
import { UserMapper } from "../mapper/UserMapper";
import { UserRequest } from "../UserRequest";
import { BaseAppService } from "./BaseAppService";

@Injectable({ scope: Scope.REQUEST })
export class UserAppService extends BaseAppService {
  constructor(usuarioRequest: UserRequest, unitOfWork: UnitOfWork) {
    super(usuarioRequest, unitOfWork);
  }
  
  //#region Domains

  private _userDs: UserDomainService;
  private userDs = () => this._userDs = this.getDomainService(this._userDs, UserDomainService); 
  
  //#endregion

  @Transaction()
  public async add(dto: UserDto): Promise<void> {
    let user = UserMapper.toDomain(dto);
    await this.userDs().add(user);
  }

  @Transaction()
  public async edit(dto: UserDto): Promise<void> {
    let user = UserMapper.toDomain(dto);
    await this.userDs().edit(user);
  }

  public verifyToken(token: string): AccessTokenPayload {
    return this.userDs().verifyToken(token);
  }

  public async read(): Promise<UserDto[]> {
    return UserMapper.toDto(await this.userDs().query().getMany());
  }
}
