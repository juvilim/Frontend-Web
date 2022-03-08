import * as React from "react";
import './Example.css';
import Dropdown from "./components/Dropdown";
import SearchField from "./components/SearchField";
import { SortDownIcon } from "./components/SortDownIcon";
import { SortIcon } from "./components/SortIcon";
import { SortUpIcon } from "./components/SortUpIcon";

interface RandomUser {
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

const GENDER_OPTIONS = ["all", "male", "female"];

function Example() {
  // TODO: Handle API with filter, pagination, sort by column + sort icon display, breadcrumb
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [selectedGender, setSelectedGender] = React.useState(GENDER_OPTIONS[0]);
  const [users, setUsers] = React.useState<RandomUser[]>([]);

  React.useEffect(() => {
    fetch("https://randomuser.me/api/?page=1&pageSize=5&results=5")
      .then(res => res.json())
      .then(data => setUsers(data.results), error => console.error(error));
  }, []);

  const handleResetFilter = () => {
    setSearchValue("aaa");
    setSelectedGender(GENDER_OPTIONS[0]);
  };

  console.log(users, searchValue, selectedGender);
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
      <table className="table">
        <thead>
          <tr className="thead-row">
            <th>Username {<SortIcon />}</th>
            <th>Name {<SortIcon />}</th>
            <th>Email {<SortIcon />}</th>
            <th>Gender {<SortIcon />}</th>
            <th>Registered Date {<SortIcon />}</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
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
      {/* TODO: Arrow left and right, pagination logic */}
      <div className="pagination-container">
        <ul className="pagination">
          <li><button>&lsaquo;</button></li>
          <li><button>1</button></li>
          <li><button>&rsaquo;</button></li>
        </ul>
      </div>
    </div>
  );
}

export default Example;
