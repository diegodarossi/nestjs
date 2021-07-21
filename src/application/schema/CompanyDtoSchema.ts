import * as Joi from 'joi';
import { Domain } from 'src/shared/Domain';
import { CompanyDto } from '../dto/CompanyDto';

export const CompanyDtoSchema = Joi.object<CompanyDto>({
    code: Joi.string()
        .max(Domain.descriptionAvg)
        .required()
        .description('Code'),

    corporateName: Joi.string()
        .max(Domain.descriptionMax)
        .required()
        .description('Name'),
});