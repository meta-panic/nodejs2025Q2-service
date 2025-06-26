import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ValidationPipe, ValidationError } from '@nestjs/common';

@Injectable()
export class UnauthorizedValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors: ValidationError[]) => {
        return new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'Validation failed',
            errors: this.flattenValidationErrors(errors),
          },
          HttpStatus.UNAUTHORIZED,
        );
      },
    });
  }

  flattenValidationErrors(errors: ValidationError[]): string[] {
    return errors.map((error) => Object.values(error.constraints).join(', '));
  }
}