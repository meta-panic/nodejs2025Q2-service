import { DEFAULT_LOGGER_FILE_SIZE, DEFAULT_LOGGER_LEVEL, OUTPUT_DESTINATION } from '../consts/defaults';
import { LogLevel } from '../consts/logLevels';


export function getOutputDestination(): 'stdout' | 'file' {
  const envValue = process.env.OUTPUT_DESTINATION?.toLowerCase();
  console.log("envValue - ", envValue)
  return envValue === 'stdout' || envValue === 'file' ? envValue : OUTPUT_DESTINATION;
}

export function getLogLevel(): LogLevel {
  const envValue = parseInt(process.env.LOG_LEVEL, 10);
  return !isNaN(envValue) && envValue >= LogLevel.VERBOSE && envValue <= LogLevel.FATAL
    ? envValue
    : DEFAULT_LOGGER_LEVEL;
}

export function getMaxFileSize(): number {
  const envValue = parseInt(process.env.MAX_LOG_FILE_SIZE, 10);
  return !isNaN(envValue) && envValue > 0
    ? envValue * 1024 // Convert KB to bytes
    : DEFAULT_LOGGER_FILE_SIZE * 1024; // Convert KB to bytes
}