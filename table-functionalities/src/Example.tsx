import * as React from "react";

import "./Example.css";
import Dropdown from "./components/Dropdown";
import SearchField from "./components/SearchField";
import { GENDER_OPTIONS, DEFAULT_PAGE, DEFAULT_PAGE_SIZE, SortOrder } from "./constants/constants";
import { useGetRandomUsers } from "./api/users";
import Pagination from "./components/Pagination";
import { SortingRule, User } from "./types";
import Table from "./components/Table";

const DEFAULT_SEARCH_VALUE = "";
const DEFAULT_GENDER = GENDER_OPTIONS[0];

function Example() {
  // TODO: breadcrumb
  const [searchValue, setSearchValue] = React.useState<string>(DEFAULT_SEARCH_VALUE);
  const [selectedGender, setSelectedGender] = React.useState(DEFAULT_GENDER);
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [sort, setSort] = React.useState<SortingRule | undefined>(undefined);

  const { isLoading, isError, data, error } = useGetRandomUsers({
    page,
    gender: selectedGender,
    keyword: searchValue,
    sort
  });

  React.useEffect(() => {
    if (searchValue || selectedGender || sort) {
      setPage(DEFAULT_PAGE);
    }
  }, [searchValue, selectedGender, sort]);

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
    if (searchValue && selectedGender !== DEFAULT_GENDER) {
      bool =
        hasKeyword([user.name, user.username, user.email], searchValue) &&
        user.gender.toLowerCase() === selectedGender.toLowerCase();
    } else if (searchValue) {
      bool = hasKeyword([user.name, user.username, user.email], searchValue);
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
    setSearchValue(DEFAULT_SEARCH_VALUE);
    setSelectedGender(DEFAULT_GENDER);
  };

  const handleColumnHeaderClick = (selectedColumn: string) => () => {
    if (!sort || sort?.sortBy !== selectedColumn) {
      setSort({
        sortBy: selectedColumn,
        order: SortOrder.ASC
      });
    } else if (sort.order === SortOrder.ASC) {
      setSort({
        sortBy: sort.sortBy,
        order: SortOrder.DESC
      });
    } else {
      setSort(undefined);
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

  const resetDisabled = searchValue === DEFAULT_SEARCH_VALUE && selectedGender === DEFAULT_GENDER && !sort;
  return (
    <div className="Example">
      <h2 className="title">Example With Search and Filter</h2>
      <div className="feature-container">
        <SearchField title="Search" value={searchValue} setValue={setSearchValue} />
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
