import * as React from "react";
import './Example.css';
import Dropdown from "./components/Dropdown";
import SearchField from "./components/SearchField";
import { SortDownIcon } from "./components/SortDownIcon";
import { SortIcon } from "./components/SortIcon";
import { SortUpIcon } from "./components/SortUpIcon";
import { GENDER_OPTIONS, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./constants/constants";
import { useGetRandomUsers } from "./api/users";
import { ArrowDownIcon } from "./components/ArrowDownIcon";

const DEFAULT_SEARCH_VALUE = "";
const DEFAULT_GENDER = GENDER_OPTIONS[0];
function Example() {
  // TODO: Handle API, sort by column + sort icon display, breadcrumb
  const [searchValue, setSearchValue] = React.useState<string>(DEFAULT_SEARCH_VALUE);
  const [selectedGender, setSelectedGender] = React.useState(DEFAULT_GENDER);
  const [page, setPage] = React.useState(DEFAULT_PAGE);

  const { isLoading, isError, data, error } = useGetRandomUsers({ page, gender: selectedGender, keyword: searchValue });

  React.useEffect(() => {
    if (searchValue || selectedGender) {
      setPage(DEFAULT_PAGE);
    }
  }, [searchValue, selectedGender]);

  const hasKeyword = (values: string[], keyword: string) => {
    return values.some(value => value.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
  };
  const filteredData = data?.filter(
    user => {
      let bool = true;
      if (searchValue && selectedGender !== DEFAULT_GENDER) {
        bool = hasKeyword([user.name.first, user.name.last, user.login.username, user.email], searchValue) && 
        user.gender.toLowerCase() === selectedGender.toLowerCase()
      } else if (searchValue) {
        bool = hasKeyword([user.name.first, user.name.last, user.login.username, user.email], searchValue)
      } else if (selectedGender !== DEFAULT_GENDER) {
        bool = user.gender.toLowerCase() === selectedGender.toLowerCase()
      }
      return bool;
    }
  );
  const tableData = React.useMemo(() => {
    if (!filteredData) return;
    const startIndex = (page - 1) * DEFAULT_PAGE_SIZE;
    const endIndex = startIndex + 5;
    return filteredData.slice(startIndex, endIndex);
  }, [page, filteredData]);

  const handleResetFilter = () => {
    setSearchValue(DEFAULT_SEARCH_VALUE);
    setSelectedGender(DEFAULT_GENDER);
  };

console.log(data, tableData);
  const renderResult = () => {
    if (isLoading) return <div className="result-container">Loading result...</div>;
    if (isError) return <div className="result-container">{error}</div>;

    const totalPage = Math.ceil(filteredData.length / DEFAULT_PAGE_SIZE);
    const selectedPageStyle: React.CSSProperties = { borderColor: "#0ea5e9", color: "#0ea5e9", fill: "#0ea5e9", pointerEvents: "none" };
    return (
      <div className="result-container">
        <table className="table">
          <thead>
            <tr>
              <th>Username {<SortIcon />}</th>
              <th>Name {<SortIcon />}</th>
              <th>Email {<SortIcon />}</th>
              <th>Gender {<SortIcon />}</th>
              <th>Registered Date {<SortIcon />}</th>
            </tr>
          </thead>
          <tbody>
            {!tableData.length && (<tr><td colSpan={5} style={{ textAlign: "center" }}>No Result</td></tr>)}
            {tableData.map((user, index) => {
              const { login: { username }, name, email, gender, registered: { date: registeredDate } } = user;
              const { first: firstName, last: lastName } = name;
              return (
                <tr key={index}>
                  <td>{username}</td>
                  <td>{`${firstName} ${lastName}`}</td>
                  <td>{email}</td>
                  <td>{gender}</td>
                  <td>{registeredDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination-container">
          <ul className="pagination">
            <li>
              <button onClick={() => setPage(page - 1)} disabled={page === DEFAULT_PAGE}>
                <ArrowDownIcon style={{ transform: "rotate(90deg)"}} />
              </button>
            </li>
            {[...Array(totalPage)].map((_item, index) => (
              <li key={index}>
                <button
                  onClick={() => setPage(index + 1)}
                  style={index + 1 === page ? selectedPageStyle : undefined}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => setPage(page + 1)} disabled={page === totalPage}>
              <ArrowDownIcon style={{ transform: "rotate(-90deg)"}} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
    
  };

  return (
    <div className="Example">
      <h2 className="title">Example With Search and Filter</h2>
      <div className="feature-container">
        <SearchField title="Search" value={searchValue} setValue={setSearchValue} />
        <Dropdown title="Gender" options={GENDER_OPTIONS} selected={selectedGender} setSelected={setSelectedGender} />
        <button className="reset-button" onClick={handleResetFilter}>
          Reset Filter
        </button>
      </div>
      {renderResult()}
    </div>
  );
}

export default Example;
