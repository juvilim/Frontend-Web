import { DEFAULT_PAGE } from "src/constants";

import { ArrowLeftIcon, ArrowRightIcon } from "../ArrowIcon";

import "./style.css";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
}

const selectedPageStyle: React.CSSProperties = {
  borderColor: "#0ea5e9",
  color: "#0ea5e9",
  fill: "#0ea5e9",
  pointerEvents: "none"
};

const Pagination = ({ page, setPage, totalPage }: Props) => {
  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li>
          <button onClick={() => setPage(page - 1)} disabled={page === DEFAULT_PAGE}>
            <ArrowLeftIcon />
          </button>
        </li>
        {[...Array(totalPage)].map((_item, index) => (
          <li key={index}>
            <button onClick={() => setPage(index + 1)} style={index + 1 === page ? selectedPageStyle : undefined}>
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPage || !totalPage}>
            <ArrowRightIcon />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
