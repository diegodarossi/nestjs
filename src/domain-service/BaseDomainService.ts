import { UnitOfWork } from "src/typeorm/UnitOfWork";

export class BaseDomainService {
    constructor(protected readonly userId: string,
                protected readonly companyId: string,
                protected readonly unitOfWork: UnitOfWork) {
    }

    protected getDomainService<T extends BaseDomainService>(domainService: T, objectDs: (new (user: string, com: string, unit: UnitOfWork) => T)): T {
        if (domainService == null) {
            domainService = new objectDs(this.userId, this.companyId, this.unitOfWork);
        }

        return domainService;
    }
}