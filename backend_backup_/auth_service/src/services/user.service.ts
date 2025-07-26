export const userService = {
  async getUserData(userId: string) {
    // Implementierung für Benutzerdaten abrufen
    return { id: userId, name: 'User', email: 'user@example.com' };
  },
  
  async getActiveProjects(userId: string) {
    // Implementierung für aktive Projekte abrufen
    return [];
  },
  
  async deleteUserData(userId: string) {
    // Implementierung für Benutzerdaten löschen
    console.log(`Deleting data for user ${userId}`);
  }
};
