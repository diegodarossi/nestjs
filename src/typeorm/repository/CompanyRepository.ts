import * as Joi from 'joi';
import { Company } from 'src/shared/entity/Company';
import { CompanyValidator } from 'src/shared/validator/CompanyValidator';
import { EntityRepository } from "typeorm";
import { CompanyConfiguration } from '../configuration/CompanyConfiguration';
import { BaseRepository } from "./BaseRepository";

@EntityRepository(CompanyConfiguration)
export class CompanyRepository extends BaseRepository<Company> {

    public validate(entity: Company): Joi.ValidationResult
    {
        return CompanyValidator.validate(entity);
    }
}
