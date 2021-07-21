import * as Joi from 'joi';
import { Domain } from 'src/shared/Domain';
import { UserDto } from '../dto/UserDto';

export const UserDtoSchema = Joi.object<UserDto>({
    login: Joi.string()
        .max(Domain.descriptionAvg)
        .required()
        .description('Login'),

    email: Joi.string()
        .max(Domain.descriptionMax)
        .email()
        .required()
        .description('E-mail'),

    name: Joi.string()
        .max(Domain.descriptionMax)
        .required()
        .description('Name'),
});