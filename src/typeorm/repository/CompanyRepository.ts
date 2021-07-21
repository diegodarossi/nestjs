import * as Joi from 'joi';
import { Company } from 'src/shared/entity/Company';
import { UserValidator } from 'src/shared/validator/UserValidator';
import { EntityRepository } from "typeorm";
import { CompanyConfiguration } from '../configuration/CompanyConfiguration';
import { BaseRepository } from "./BaseRepository";

@EntityRepository(CompanyConfiguration)
export class CompanyRepository extends BaseRepository<Company> {

    public validate(entity: Company): Joi.ValidationResult
    {
        return UserValidator.validate(entity);
    }
}