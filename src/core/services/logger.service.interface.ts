export const LOGGER_SERVICE = 'LOGGER_SERVICE';

export interface ILoggerService {
  verbose(message: string): Promise<void>;
  debug(message: string): Promise<void>;
  log(message: string): Promise<void>;
  warn(message: string): Promise<void>;
  error(message: string): Promise<void>;
  fatal(message: string): Promise<void>;
}

