import * as Joi from 'joi';
import { Domain } from '../Domain';
import { Company } from '../entity/Company';

export const CompanyValidator = Joi.object<Company>({
  companyId: Joi.string()
    .required()
    .uuid(),

  code: Joi.string()
    .required()
    .max(Domain.descriptionAvg),

  corporateName: Joi.string()
    .required()
    .max(Domain.descriptionMax),
});