import * as Joi from 'joi';
import { User } from 'src/shared/entity/User';
import { UserValidator } from 'src/shared/validator/UserValidator';
import { EntityRepository } from "typeorm";
import { UserConfiguration } from '../configuration/UserConfiguration';
import { BaseRepository } from "./BaseRepository";

@EntityRepository(UserConfiguration)
export class UserRepository extends BaseRepository<User> {

    public validate(entity: User): Joi.ValidationResult
    {
        return UserValidator.validate(entity);
    }
}