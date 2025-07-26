export interface Hypothesis {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'tested' | 'confirmed' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export class HypothesisService {
  async getAllHypotheses(): Promise<Hypothesis[]> {
    // TODO: Datenbank-Implementierung
    return [
      {
        id: '1',
        title: 'Beispiel-Hypothese',
        description: 'Das ist eine Beispiel-Hypothese für die Forschung',
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  async getHypothesisById(id: string): Promise<Hypothesis | null> {
    // TODO: Datenbank-Implementierung
    if (id === '1') {
      return {
        id: '1',
        title: 'Beispiel-Hypothese',
        description: 'Das ist eine Beispiel-Hypothese für die Forschung',
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    return null;
  }

  async createHypothesis(data: Partial<Hypothesis>): Promise<Hypothesis> {
    // TODO: Datenbank-Implementierung
    return {
      id: Date.now().toString(),
      title: data.title || 'Neue Hypothese',
      description: data.description || '',
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
