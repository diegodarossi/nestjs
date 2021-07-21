import * as Joi from 'joi';
import { ValidatorException } from 'src/base/exception/ValidatorException';
import { DeepPartial, FindConditions, InsertResult, ObjectID, Repository, SaveOptions, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class BaseRepository<Entity> extends Repository<Entity> {

    public save<T extends DeepPartial<Entity>>(entity: T, options?: SaveOptions): Promise<T & Entity>
    public save<T extends DeepPartial<Entity>>(entities: T[], options?: SaveOptions): Promise<(T & Entity)[]>;
    public save<T extends DeepPartial<Entity>>(entity: T | T[], options?: SaveOptions): Promise<T & Entity> | Promise<(T & Entity)[]> {
        if (!Array.isArray(entity)) {
            let deep = entity as DeepPartial<Entity>;
            let valid = this.validate(deep as Entity);
            
            if (valid.error == null) {
                return super.save(entity as T, options);
            } else {
                throw new ValidatorException(valid.error.message);
            }
        } else {
            let entities = entity as Array<T>;
            for (let x in entities) {
                let deep = entities[x] as DeepPartial<Entity>;
                let valid = this.validate(deep as Entity);

                if (valid.error != null) {
                    throw new ValidatorException(valid.error.message);
                }
            }

            return super.save(entities, options);
        }
    }

    public insert(entity: QueryDeepPartialEntity<Entity> | (QueryDeepPartialEntity<Entity>[])): Promise<InsertResult> {
        let valid = this.validate(entity as Entity);

        if (valid.error == null) {
            return super.insert(entity);
        } else {
            throw new ValidatorException(valid.error.message);
        }
    }

    public update(criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>, partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult> {
        let valid = this.validate(partialEntity as Entity);

        if (valid.error == null) {
            return super.update(criteria, partialEntity);
        } else {
            throw new ValidatorException(valid.error.message);
        }
    }

    public abstract validate(entity: Entity): Joi.ValidationResult;
}