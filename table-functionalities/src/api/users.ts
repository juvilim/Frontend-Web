import { useQuery } from "react-query";
import { RandomUser, SortingRule } from "src/types";

import { BASE_URL, DEFAULT_PAGE_SIZE, DEFAULT_RESULTS, GENDER_OPTIONS } from "../constants/constants";

interface RandomUsersArgs {
  page: number;
  gender: string;
  keyword: string;
  sort?: SortingRule;
}

export const useGetRandomUsers = ({ page, gender, keyword, sort }: RandomUsersArgs) => {
  const queryParams: string[] = [
    `page=${page}`,
    `pageSize=${DEFAULT_PAGE_SIZE}`,
    `results=${DEFAULT_RESULTS}`,
    "seed=seed"
  ];
  if (gender !== GENDER_OPTIONS[0]) queryParams.push(`gender=${gender}`);
  if (keyword) queryParams.push(`keyword=${keyword}`);
  if (sort) queryParams.push(`sortBy=${sort.sortBy}`, `sortOrder=${sort.order}`);

  return useQuery<RandomUser[]>(["users", gender, keyword], async () => {
    const response = await fetch(`${BASE_URL}?${queryParams.join("&")}`, {
      method: "GET"
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message);
    }

    return responseJson.results;
  });
};
