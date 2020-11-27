export class ErroAuthFr {
  static convertMessage(error: any): string {
    switch (error.code) {
      case 'auth/user-not-found': {
        return "Il n'existe aucun utilisateur correspondant aux identifiants fournis.";
      }
      case 'auth/invalid-password': {
        return 'Le mot de passe est incorrect';
      }
      case 'auth/email-already-exists': {
        return 'Cet email est déjà utilisé par un utilisateur existant.';
      }
      case 'auth/email-already-in-use': {
        return 'Cet email est déjà utilisé par un utilisateur existant.';
      }
      case 'auth/invalid-display-name': {
        return 'Ce nom est incorrect.';
      }
      case 'auth/invalid-email': {
        return 'Cet email est incorrect.';
      }
      case 'auth/invalid-email': {
        return 'Cet email est incorrect.';
      }
      case 'auth/invalid-phone-number': {
        return 'Ce numéro de téléphone est incorrect.';
      }
      case 'auth/phone-number-already-exists': {
        return 'Ce numéro de téléphone est déjà utilisé par un utilisateur existant.';
      }
      case 'auth/wrong-password': {
        return 'Ce mot de passe est incorrect.';
      }
      case 'auth/too-many-requests': {
        return 'Ce mot de passe est incorrect.';
      }
      case 'auth/too-many-requests': {
        return 'Ce mot de passe est incorrect.';
      }
      default: {
        return error.message;
      }
    }
  }
}
