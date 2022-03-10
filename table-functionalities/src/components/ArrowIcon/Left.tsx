import { ArrowDownIcon } from "./Down";

interface Props {
  style?: React.CSSProperties;
}

export const ArrowLeftIcon = ({ style }: Props) => {
  return <ArrowDownIcon style={{ ...style, transform: "rotate(90deg)" }} />;
};
