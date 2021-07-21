import { Injectable, Scope } from "@nestjs/common";
import { CompanyDomainService } from "src/domain-service/CompanyDomainService";
import { UserDomainService } from "src/domain-service/UserDomainService";
import { UnitOfWork } from "src/typeorm/UnitOfWork";
import { Transaction } from "../decorator/TransactionDecorator";
import { CompanyDto } from "../dto/CompanyDto";
import { UserDto } from "../dto/UserDto";
import { CompanyMapper } from "../mapper/CompanyMapper";
import { UserMapper } from "../mapper/UserMapper";
import { UserRequest } from "../UserRequest";
import { BaseAppService } from "./BaseAppService";

@Injectable({ scope: Scope.REQUEST })
export class CompanyAppService extends BaseAppService {
  constructor(usuarioRequest: UserRequest, unitOfWork: UnitOfWork) {
    super(usuarioRequest, unitOfWork);
  }
  
  //#region Domains

  private _companyDs: CompanyDomainService;
  private companyDs = () => this._companyDs = this.getDomainService(this._companyDs, CompanyDomainService); 

  private _userDs: UserDomainService;
  private userDs = () => this._userDs = this.getDomainService(this._userDs, UserDomainService); 
  
  //#endregion

  @Transaction()
  public async add(dto: CompanyDto): Promise<void> {
    let company = CompanyMapper.toDomain(dto);
    await this.companyDs().add(company);
  }

  @Transaction()
  public async edit(dto: CompanyDto): Promise<void> {
    let company = CompanyMapper.toDomain(dto);
    await this.companyDs().edit(company);
  }

  @Transaction()
  public async changeUserCompany(companyDto: CompanyDto, userDto: UserDto) {
    let company = CompanyMapper.toDomain(companyDto);
    let user = UserMapper.toDomain(userDto);

    await this.companyDs().edit(company);
    await this.userDs().edit(user);
  }

  public async read(): Promise<CompanyDto[]> {
    return CompanyMapper.toDto(await this.companyDs().query().getMany());
  }
}
