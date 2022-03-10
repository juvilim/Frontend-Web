import { ArrowDownIcon } from "./Down";

interface Props {
  style?: React.CSSProperties;
}

export const ArrowUpIcon = ({ style }: Props) => {
  return <ArrowDownIcon style={{ ...style, transform: "rotate(180deg)" }} />;
};
