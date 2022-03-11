import * as React from "react";
import * as _ from "lodash";
import { useLocation, useNavigate } from "react-router-dom";

import "./Example.css";

import Dropdown from "./components/Dropdown";
import SearchField from "./components/SearchField";
import { GENDER_OPTIONS, DEFAULT_PAGE, DEFAULT_PAGE_SIZE, SortOrder, SEARCH_DELAY } from "./constants";
import { useGetRandomUsers } from "./api/users";
import Pagination from "./components/Pagination";
import { SortingRule, User } from "./types";
import Table from "./components/Table";
import Breadcrumbs from "./components/Breadcrumbs";

const DEFAULT_KEYWORD = "";
const DEFAULT_GENDER = GENDER_OPTIONS[0];

function Example() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [keyword, setKeyword] = React.useState<string>(DEFAULT_KEYWORD);
  const [selectedGender, setSelectedGender] = React.useState(DEFAULT_GENDER);
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [sort, setSort] = React.useState<SortingRule | undefined>(undefined);

  const { isLoading, isError, data, error } = useGetRandomUsers({
    page,
    gender: selectedGender,
    keyword,
    sort
  });

  React.useEffect(() => {
    if (keyword || selectedGender || sort) {
      setPage(DEFAULT_PAGE);
    }
  }, [keyword, selectedGender, sort]);

  const sanitizedData: User[] = React.useMemo(() => {
    return data?.map((user) => {
      const {
        login: { username },
        name: { first: firstName, last: lastName },
        email,
        gender,
        registered: { date: registeredDate }
      } = user;
      const name = `${firstName} ${lastName}`;
      return { username, name, email, gender, registeredDate };
    });
  }, [data]);

  const sortedData = sanitizedData?.slice();
  sortedData?.sort((a, b) => {
    if (!sort) return 0;

    const columnName = sort.sortBy;
    if (sort.order === SortOrder.ASC) {
      return a[columnName] > b[columnName] ? 1 : -1;
    } else if (sort.order === SortOrder.DESC) {
      return a[columnName] < b[columnName] ? 1 : -1;
    }
  });

  const hasKeyword = (values: string[], keyword: string) => {
    return values.some((value) => value.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
  };

  const filteredData = sortedData?.filter((user) => {
    let bool = true;
    if (keyword && selectedGender !== DEFAULT_GENDER) {
      bool =
        hasKeyword([user.name, user.username, user.email], keyword) &&
        user.gender.toLowerCase() === selectedGender.toLowerCase();
    } else if (keyword) {
      bool = hasKeyword([user.name, user.username, user.email], keyword);
    } else if (selectedGender !== DEFAULT_GENDER) {
      bool = user.gender.toLowerCase() === selectedGender.toLowerCase();
    }
    return bool;
  });

  const tableData = React.useMemo(() => {
    if (!filteredData) return;

    const startIndex = (page - 1) * DEFAULT_PAGE_SIZE;
    const endIndex = startIndex + 5;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, page]);

  const handleResetFilter = () => {
    setKeyword(DEFAULT_KEYWORD);
    setSelectedGender(DEFAULT_GENDER);
  };

  const debouncedSort = React.useRef(
    _.debounce((sort?: SortingRule) => {
      setSort(sort);
    }, SEARCH_DELAY)
  ).current;

  const handleColumnHeaderClick = (selectedColumn: string) => () => {
    if (!sort || sort?.sortBy !== selectedColumn) {
      debouncedSort({
        sortBy: selectedColumn,
        order: SortOrder.ASC
      });
    } else if (sort.order === SortOrder.ASC) {
      debouncedSort({
        sortBy: sort.sortBy,
        order: SortOrder.DESC
      });
    } else {
      debouncedSort(undefined);
    }
  };

  const renderResult = () => {
    if (isLoading) return <>Loading result...</>;
    if (isError) return <>{error}</>;

    const totalPage = Math.ceil(filteredData?.length / DEFAULT_PAGE_SIZE);
    return (
      <>
        <Table data={tableData} sort={sort} onColumnHeaderClick={handleColumnHeaderClick} />
        <Pagination page={page} setPage={setPage} totalPage={totalPage} />
      </>
    );
  };

  const resetDisabled = keyword === DEFAULT_KEYWORD && selectedGender === DEFAULT_GENDER && !sort;
  return (
    <div className="Example">
      <Breadcrumbs pathname={pathname} navigate={navigate} />
      <h2 className="title">Example With Search and Filter</h2>
      <div className="feature-container">
        <SearchField title="Search" value={keyword} setValue={setKeyword} />
        <Dropdown title="Gender" options={GENDER_OPTIONS} selected={selectedGender} setSelected={setSelectedGender} />
        <button className="reset-button" onClick={handleResetFilter} disabled={resetDisabled}>
          Reset Filter
        </button>
      </div>
      <div className="result-container">{renderResult()}</div>
    </div>
  );
}

export default Example;
