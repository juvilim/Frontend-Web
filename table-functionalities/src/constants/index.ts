export const GITHUB_REPO_PATH = "/Frontend-Web";
export const ROUTES = [
  {
    path: GITHUB_REPO_PATH + "/example",
    name: "example"
  },
  {
    path: GITHUB_REPO_PATH,
    name: "home"
  }
];

export const BASE_URL = "https://randomuser.me/api/";
export const SEARCH_DELAY = 500;
export const GENDER_OPTIONS = ["all", "male", "female"];
export const TABLE_COLUMNS = [
  { label: "Username", value: "username" },
  { label: "Name", value: "name" },
  { label: "Email", value: "email" },
  { label: "Gender", value: "gender" },
  { label: "RegisteredDate", value: "registeredDate" }
];
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_RESULTS = 10;
export enum SortOrder {
  ASC = "asc",
  DESC = "desc"
}
