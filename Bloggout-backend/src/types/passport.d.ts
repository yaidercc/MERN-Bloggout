import 'express';
import 'passport';

// Extiende la interfaz de Request para incluir métodos de Passport
declare module 'express-serve-static-core' {
  interface Request {
    logIn(user: any, options: any, callback: (err?: Error) => Promise<void>): void;
    logOut(callback: (err?: Error) => void): void;
  }
}
