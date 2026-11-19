export interface Loan {
  id: string;
  reader: string;
  librarian: string;
  loanDate: string;
  expectedReturnDate: string;
  status: string;
  details: LoanItemDetail[];
}

export interface LoanListItem {
  id: string;
  reader: string;
  loanDate: string;
  status: string;
}

export interface LoanDetailRequest {
  bookId: string;
  quantity: number;
}

export interface CreateLoanRequest {
  readerId: string;
  librarian: string;
  expectedReturnDate: string;
  details: LoanDetailRequest[];
}

export interface LoanItemDetail {
  book: string;
  quantity: number;
}