import { BaseDomainService } from "src/domain-service/BaseDomainService";
import { UnitOfWork } from "src/typeorm/UnitOfWork";
import { UserRequest } from "../UserRequest";

export class BaseAppService {
  constructor(public readonly userRequest: UserRequest,
              public readonly unitOfWork: UnitOfWork) {}

  protected getDomainService<T extends BaseDomainService>(domainService: T, objectDs: (new (user: string, emp: string, unit: UnitOfWork) => T)): T {
    if (domainService == null) {
      domainService = new objectDs(this.userRequest.userId, 
                                   this.userRequest.companyId,
                                   this.unitOfWork);
    }

    return domainService;
  }
}
