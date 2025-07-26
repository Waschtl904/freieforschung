// project_service/src/services/compliance.service.ts
export const complianceService = {
  async createIncidentReport(data: any) {
    return { id: 'incident-' + Date.now(), ...data };
  },
  
  async getComplianceReports() {
    return [];
  },

  // Neue Methode hinzufügen
  async createDSBReport(data: {
    incidentType: string;
    description: string;
    affectedUsers: string[];
    measuresTaken: string[];
    reportedAt: Date;
    reporterId?: string;
  }) {
    return { 
      id: 'dsb-report-' + Date.now(), 
      status: 'submitted',
      ...data 
    };
  }
};
