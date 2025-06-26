
export function sanitizeData(data: Record<string, any>): Record<string, any> {
  const sanitizedData = { ...data };
  const sensitiveFields = ['password'];

  sensitiveFields.forEach(field => {
    if (sanitizedData[field]) {
      delete sanitizedData[field];
    }
  });

  return sanitizedData;
}
