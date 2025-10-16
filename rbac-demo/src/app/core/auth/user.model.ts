export type Role = 'User' | 'Admin' | 'SuperAdmin'; // Guest = unauthenticated

export interface User {
  id: number;
  username: string;
  role: Role;
  token: string; // fake JWT
}
