export interface Reader {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  userName: string;
}

export interface ListReaderItem {
  id: string;
  fullName: string;
  email: string;
}

export interface CreateReaderRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface UpdateReaderRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
}