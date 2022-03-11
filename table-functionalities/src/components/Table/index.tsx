import { SortOrder, TABLE_COLUMNS } from "src/constants/constants";
import { SortingRule, User } from "src/types";

import { SortDownIcon, SortIcon, SortUpIcon } from "../SortIcon";

import "./style.css";

interface Props {
  data?: User[];
  sort?: SortingRule;
  onColumnHeaderClick: (selectedColumn: string) => () => void;
}

const Table = ({ data, sort, onColumnHeaderClick }: Props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {TABLE_COLUMNS.map(({ label, value }, index) => (
            <th className="column-header" key={index} onClick={onColumnHeaderClick(value)}>
              {label}
              {!sort || sort.sortBy !== value ? (
                <SortIcon />
              ) : sort.order === SortOrder.ASC ? (
                <SortUpIcon />
              ) : (
                <SortDownIcon />
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(!data || !data.length) && (
          <tr>
            <td colSpan={5} style={{ textAlign: "center" }}>
              No Result
            </td>
          </tr>
        )}
        {data?.map((item, index) => {
          const { username, name, email, gender, registeredDate } = item;
          return (
            <tr key={index}>
              <td>{username}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{gender}</td>
              <td>{registeredDate}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
