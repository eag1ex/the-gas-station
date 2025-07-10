import {
  Catch,
  InternalServerErrorException,
  ExceptionFilter,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { API_MESSAGES } from '@/lib/constants/api-messages.constant';

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

        Logger.error(`[HandleException] ${propertyKey.toString()}:`, error);

        // Fallback to generic 500 error
        throw new InternalServerErrorException(API_MESSAGES.SERVICE_FAILURE);
      }
    };

    return descriptor;
  };
}

// @Catch(BadRequestException)
// export class RecipeValidationFilter implements ExceptionFilter {
//   catch(_: BadRequestException, host: ArgumentsHost) {
//     const response = host.switchToHttp().getResponse<Response>();

//     response.status(HttpStatus.BAD_REQUEST).json({
//       message: API_MESSAGES.CREATE_FAILURE,
//       required: API_MESSAGES.REQUIRED_FIELDS,
//       error: 'Bad Request',
//       statusCode: 400,
//     });
//   }
// }

@Catch(BadRequestException)
export class RecipeValidationFilterV2 implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const exceptionResponse = exception.getResponse();

    const isValidationError =
      typeof exceptionResponse === 'object' &&
      Array.isArray((exceptionResponse as any).message);

    // we want to pass status ok for invalid request from dto validation only
    if (isValidationError) {
      response.status(HttpStatus.OK).json({
        message: API_MESSAGES.CREATE_FAILURE,
        required: API_MESSAGES.REQUIRED_FIELDS,
        error: 'Bad Request',
      });
    } else {
      // fall back to default handling
      response.status(HttpStatus.BAD_REQUEST).json(exceptionResponse);
    }
  }
}

export function CatchServiceError() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        Logger.error(`[Service Error] ${propertyKey}:`, error);
        throw new InternalServerErrorException(API_MESSAGES.SERVICE_FAILURE);
      }
    };

    return descriptor;
  };
}
