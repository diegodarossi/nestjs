import { ValidatorException } from 'src/base/exception/ValidatorException';
import { Company } from 'src/shared/entity/Company';
import { CompanyRepository } from 'src/typeorm/repository/CompanyRepository';
import { SelectQueryBuilder } from "typeorm";
import { BaseDomainService } from "./BaseDomainService";

export class CompanyDomainService extends BaseDomainService {
    private repository = (): CompanyRepository => this.unitOfWork.company();

    //#region Consultas

    public query(): SelectQueryBuilder<Company> {
        return this.repository().createQueryBuilder("user");
    }

    public queryId(userId: string): SelectQueryBuilder<Company> {
        return this.query().andWhere('user.usuarioId = :userId', { userId });
    }

    //#endregion
    
    public async add(company: Company): Promise<void> {
        if (await this.isValid(company)) {
            await this.repository().save(company);
        }
    }

    public async edit(company: Company): Promise<void> {
        if (await this.isValid(company)) {
            await this.repository().save(company);
        }
    }

    //#region Helpers

    private async isValid(company: Company): Promise<boolean>  {
        let validate = this.repository().validate(company);
        if (validate.error != null) {
            throw new ValidatorException(validate.error.message);
        }

        let isExist = await this.query()
            .andWhere('company.code = :code', { code: company.code })
            .andWhere('company.companyId != :companyId', { companyId: company.companyId })
            .getCount() > 0;

        if (isExist) {
            throw new ValidatorException('Company Exist!');
        }        

        return true;
    }

    //#endregion
}