import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || exception.message;
        error = (exceptionResponse as any).error || error;
      }
    } else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      message = this.handleDatabaseError(exception);
      error = 'Database Error';
    } else if (exception.code === '23505') { // Unique constraint violation
      status = HttpStatus.CONFLICT;
      message = 'Resource already exists';
      error = 'Conflict';
    } else if (exception.code === '23503') { // Foreign key constraint violation
      status = HttpStatus.BAD_REQUEST;
      message = 'Invalid reference to related resource';
      error = 'Bad Request';
    }

    this.logger.error(
      `${request.method} ${request.url}`,
      exception.stack,
      'GlobalExceptionFilter',
    );

    const errorResponse = {
      success: false,
      statusCode: status,
      error,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }

  private handleDatabaseError(exception: QueryFailedError): string {
    const message = exception.message;
    
    if (message.includes('duplicate key value violates unique constraint')) {
      return 'A record with this value already exists';
    }
    
    if (message.includes('violates foreign key constraint')) {
      return 'Invalid reference to related resource';
    }
    
    if (message.includes('violates not-null constraint')) {
      return 'Required field is missing';
    }
    
    return 'Database operation failed';
  }
}