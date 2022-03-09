import { useQuery } from "react-query";
import { BASE_URL, DEFAULT_PAGE_SIZE, DEFAULT_RESULTS } from "src/constants/constants";

export interface RandomUser {
  login: {
    username: string;
  }
  name: {
    first: string;
    last: string;
  }
  email: string;
  gender: string;
  registered: {
    date: Date;
  }
}

interface RandomUsersArgs {
  page: number;
  gender: string;
  keyword: string;
};

export const useGetRandomUsers = ({ page, gender, keyword }: RandomUsersArgs) => {
  //`page=${page}`, 
  const queryParams: string[] = [`pageSize=${DEFAULT_PAGE_SIZE}`, `results=${DEFAULT_RESULTS}`];
  // if (gender) queryParams.push(`gender=${gender}`);
  // if (keyword) queryParams.push(`keyword=${keyword}`);

  console.log('useGetRandomUsers', queryParams);
  return useQuery<RandomUser[]>(['users'], async () => {
    const response = await fetch(`${BASE_URL}?${queryParams.join('&')}`, {
      method: "GET" 
    });
    console.log('resp', response);
    const responseJson = await response.json();
    if (!response.ok) {
      console.error(responseJson.message);
      throw new Error(responseJson.message);
    }

    return responseJson.results;
  });
};
