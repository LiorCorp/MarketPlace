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
        return "L'accès à ce compte a été temporairement désactivé en raison de nombreuses tentatives de connexion infructueuses. Vous pouvez le rétablir immédiatement en réinitialisant votre mot de passe ou vous pouvez réessayer plus tard.";
      }
      case 'auth/account-exists-with-different-credential': {
        return "Un compte existe déjà avec l'email qui est rattaché à ce compte";
      }
      case 'auth/cancelled-popup-request': {
        return "Plusieurs popup d'authentification ont été déclenchées successivement.";
      }
      case 'auth/popup-blocked': {
        return "La popup d'authentification a été bloquée par votre navigateur.";
      }
      case 'auth/popup-closed-by-user': {
        return "La popup d'authentification a été fermée avant que la connexion soit établie.";
      }
      default: {
        return "Une erreur s'est produite : " + error.message;
      }
    }
  }
}
