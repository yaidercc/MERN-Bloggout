import { User } from '../helpers/interfaces ';
import 'express-session';
import 'passport';

// Extiende la interfaz de Request de express-session para incluir Passport
declare module 'express-session' {
  interface SessionData {
    passport?: {
      user?: User;
    };
  }
}
