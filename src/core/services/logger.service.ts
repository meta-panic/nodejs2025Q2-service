import { Injectable, Scope } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';
import { ILoggerService } from './logger.service.interface';
import { promises as fs } from 'fs';
import { LogLevel } from '../consts/logLevels';
import { getLogLevel, getMaxFileSize } from '../utils/env.utils';


const LEVEL_MAP: Record<LogLevel, string> = {
  [LogLevel.VERBOSE]: 'VERBOSE',
  [LogLevel.DEBUG]: 'DEBUG',
  [LogLevel.LOG]: 'LOG',
  [LogLevel.WARN]: 'WARN',
  [LogLevel.ERROR]: 'ERROR',
  [LogLevel.FATAL]: 'FATAL',
};

config();

@Injectable({ scope: Scope.DEFAULT })
export class LoggerService implements ILoggerService {
  private logLevel: LogLevel;
  private logFile: string;
  private errorFile: string;
  private maxFileSize: number;
  private outputTo: 'stdout' | 'file';

  constructor(outputTo: 'stdout' | 'file') {
    this.logLevel = getLogLevel();
    this.logFile = join(process.cwd(), 'logs/app.log');
    this.errorFile = join(process.cwd(), 'logs/error.log');
    this.maxFileSize = getMaxFileSize();
    this.outputTo = outputTo;

    if (!existsSync(join((process.cwd(), 'logs')))) {
      mkdirSync(join((process.cwd(), 'logs')));
    }
  }

  private async writeToFile(file: string, message: string): Promise<void> {
    const stream = createWriteStream(file, { flags: 'a' });
    stream.write(`${message}\n`);
    stream.end();
  }

  private async rotateFile(file: string): Promise<void> {
    try {
      const stats = await fs.stat(file);
      if (stats.size > this.maxFileSize) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await fs.rename(file, `${file}.${timestamp}`);
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }

  async verbose(message: string): Promise<void> {
    await this.doLogging(LogLevel.VERBOSE, message);
  }
  async debug(message: string): Promise<void> {
    await this.doLogging(LogLevel.DEBUG, message);
  }
  async log(message: string): Promise<void> {
    await this.doLogging(LogLevel.LOG, message);
  }
  async warn(message: string): Promise<void> {
    await this.doLogging(LogLevel.WARN, message);
  }
  async error(message: string): Promise<void> {
    await this.doLogging(LogLevel.ERROR, message, true);
  }
  async fatal(message: string): Promise<void> {
    await this.doLogging(LogLevel.FATAL, message, true);
  }

  private getLevelString(level: LogLevel): string {
    return LEVEL_MAP[level] || 'UNKNOWN';
  }

  private async doLogging(level: LogLevel, message: string, isError: boolean = false): Promise<void> {
    if (level >= this.logLevel) {
      const levelString = this.getLevelString(level);
      const formattedMessage = `[${new Date().toISOString()}] [${levelString}] ${message}`;

      if (this.outputTo === 'stdout') {
        console.log(formattedMessage);
      } else {
        const file = isError ? this.errorFile : this.logFile;
        await this.rotateFile(file);
        await this.writeToFile(file, formattedMessage);
      }
    }
  }
}

