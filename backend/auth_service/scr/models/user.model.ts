export interface User {
  id: string;
  pseudonym: string;       // statt realem Namen
  role: 'researcher' | 'reviewer';
  createdAt: Date;
  email?: string;
}

// DTO für Registration
export interface UserRegistration {
  pseudonym: string;
  email: string;
  role: 'researcher' | 'reviewer';
  privacyConsents: {
    dataProcessing: boolean;
    marketing: boolean;
    analytics: boolean;
  };
}
