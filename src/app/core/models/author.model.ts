export interface Author {
  id: string;
  name: string;
  country: string;
}

export interface ListAuthorItem {
  id: string;
  name: string;
  country: string;
}

export interface CreateAuthorRequest {
  name: string;
  country: string;
}

export interface UpdateAuthorRequest {
  name: string;
  country: string;
}