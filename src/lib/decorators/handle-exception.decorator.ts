// src/lib/decorators/handle-exception.decorator.ts

import {
  Catch,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

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
