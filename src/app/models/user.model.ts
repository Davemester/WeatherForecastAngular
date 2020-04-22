export interface User {
  userName: string;
  passwordHash: string;
  passwordSalt: string;
  cities: string[];
  isLoggedIn: boolean;
}
