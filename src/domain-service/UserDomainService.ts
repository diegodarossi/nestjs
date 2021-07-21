import { verify } from 'jsonwebtoken';
import { ValidatorException } from 'src/base/exception/ValidatorException';
import { AccessTokenPayload } from 'src/base/model/AccessTokenPayload';
import { User } from "src/shared/entity/User";
import { UserRepository } from "src/typeorm/repository/UserRepository";
import { SelectQueryBuilder } from "typeorm";
import { BaseDomainService } from "./BaseDomainService";
import { CompanyDomainService } from './CompanyDomainService';


export class UserDomainService extends BaseDomainService {
    private repository = (): UserRepository => this.unitOfWork.user();

    //#region Domains

    private _companyDs: CompanyDomainService 
    private companyDs = () => this._companyDs = this.getDomainService(this._companyDs, CompanyDomainService);

    //#endregion

    //#region Consultas

    public query(): SelectQueryBuilder<User> {
        return this.repository().createQueryBuilder("user");
    }

    public queryId(userId: string): SelectQueryBuilder<User> {
        return this.query().andWhere('user.usuarioId = :userId', { userId });
    }

    public queryLogin(login: string): SelectQueryBuilder<User> {
        return this.query().andWhere('user.login = :login', { login });
    }

    //#endregion
    
    public async add(user: User): Promise<void> {
        if (await this.isValid(user)) {
            await this.repository().save(user);
        }
    }

    public async edit(user: User): Promise<void> {
        if (await this.isValid(user)) {
            await this.repository().save(user);
        }
    }

    public verifyToken(token: string): AccessTokenPayload {
        let object = verify(token, Buffer.from(process.env['ACCESS_TOKEN_SECRET'], 'base64'));
        return object;
    }

    //#region Helpers

    private async isValid(user: User): Promise<boolean>  {
        let validate = this.repository().validate(user);
        if (validate.error != null) {
            throw new ValidatorException(validate.error.message);
        }

        let isExist = await this.queryLogin(user.login)
            .andWhere('user.userId != :userId', { userId: user.userId })
            .getCount() > 0;

        if (isExist) {
            throw new ValidatorException('User Exist!');
        }        

        return true;
    }

    //#endregion
}