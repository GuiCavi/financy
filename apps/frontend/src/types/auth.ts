export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type RegisterInput = {
  data: {
    name: string;
    email: string;
    password: string;
  };
};

export type RegisterOutput = {
  register?: {
    token: string;
    refreshToken: string;
    user: User;
  };
};

export type LoginInput = {
  data: {
    email: string;
    password: string;
  };
};

export type LoginOutput = {
  login?: {
    token: string;
    refreshToken: string;
    user: User;
  };
};