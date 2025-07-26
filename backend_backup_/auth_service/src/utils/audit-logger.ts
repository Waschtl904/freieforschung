// auth_service/src/utils/audit-logger.ts
export const auditLogger = {
  log(logData: {
    action: string;
    user_id: string;
    timestamp: Date;
    ip_address?: string;
    user_agent?: string;
  }): void {
    console.log(`[AUDIT] ${logData.timestamp.toISOString()} -`, {
      userId: logData.user_id,
      ip: logData.ip_address,
      userAgent: logData.user_agent
    });
  }
};
