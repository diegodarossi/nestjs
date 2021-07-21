import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ValidatorException } from 'src/base/exception/ValidatorException';

@Injectable()
export class ParseNumberPipe implements PipeTransform<any, number> {
  transform(value: any, metadata: ArgumentMetadata): number {
    if (typeof value == 'number') {
      return value as number;
    }

    const val = Number(value ?? 0);

    if (isNaN(val)) {
      throw new ValidatorException('Paramter invalid!');
    }
    
    return val;
  }
}