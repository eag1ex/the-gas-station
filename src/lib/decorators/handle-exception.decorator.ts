// src/lib/decorators/handle-exception.decorator.ts

import {
  Catch,
  InternalServerErrorException,
  ExceptionFilter,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { API_MESSAGES } from '../constants/api-messages.constant';

export function HandleException(
  customHandler?: (e: any) => any,
): MethodDecorator {
  return function (target, propertyKey, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (customHandler) {
          return customHandler(error);
        }

        // Log the error if needed
        console.error(`[HandleException] ${propertyKey.toString()}:`, error);

        // Fallback to generic 500 error
        throw new InternalServerErrorException('Unexpected error occurred');
      }
    };

    return descriptor;
  };
}

@Catch(BadRequestException)
export class RecipeValidationFilter implements ExceptionFilter {
  catch(_: BadRequestException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      message: API_MESSAGES.CREATE_FAILURE,
      required: API_MESSAGES.REQUIRED_FIELDS,
      error: 'Bad Request',
      statusCode: 400,
    });
  }
}
