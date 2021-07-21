import { ArgumentMetadata, PipeTransform, Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import * as Joi from 'joi';
import { SchemaException } from 'src/base/exception/SchemaException';

export class ParsePipe<TModel> implements PipeTransform {
  constructor(private readonly _validator: Joi.AnySchema,
              private readonly _itemType: Type<TModel>) {
  }

  transform(value: any, metadata: ArgumentMetadata) {
    let valid = this._validator.validate(value, { abortEarly: false });

    if (valid.error != null) {
      if (valid.error instanceof SchemaException) {
        throw valid.error;
      } else {
        throw new SchemaException(valid.error.message);
      }
    }

    return plainToClass(this._itemType, value);
  }
}