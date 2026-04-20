export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type RegisterOutput = {
  token: string;
  refreshToken: string;
  user: User;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginOutput = {
  token: string;
  refreshToken: string;
  user: User;
};