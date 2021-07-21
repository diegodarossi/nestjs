import * as Joi from 'joi';
import { Domain } from '../Domain';
import { User } from '../entity/User';

export const UserValidator = Joi.object<User>({
  userId: Joi.string()
    .required()
    .uuid(),

  login: Joi.string()
    .required()
    .max(Domain.descriptionAvg),

  email: Joi.string()
    .required()
    .email()
    .max(Domain.descriptionMax),
  
  name: Joi.string()
    .required()
    .max(Domain.descriptionMax),
});