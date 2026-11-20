export interface User {
  id: string;
  userName: string;
  role: string;
}

export interface ListUserItem {
  id: string;
  userName: string;
  role: string;
}

export interface CreateUserRequest {
  userName: string;
  password: string;
  role: string;
}

export interface UpdateUserRequest {
  userName: string;
  role: string;
}