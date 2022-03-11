import { SortOrder } from "./constants";

export interface RandomUser {
  login: {
    username: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  gender: string;
  registered: {
    date: Date;
  };
}

export interface User {
  username: string;
  name: string;
  email: string;
  gender: string;
  registeredDate: Date;
}

export interface SortingRule {
  sortBy: string;
  order: SortOrder;
}
