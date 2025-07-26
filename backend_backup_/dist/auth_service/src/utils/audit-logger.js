"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogger = void 0;
// auth_service/src/utils/audit-logger.ts
exports.auditLogger = {
    log(logData) {
        console.log(`[AUDIT] ${logData.timestamp.toISOString()} -`, {
            userId: logData.user_id,
            ip: logData.ip_address,
            userAgent: logData.user_agent
        });
    }
};
