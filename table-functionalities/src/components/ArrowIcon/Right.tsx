import { ArrowDownIcon } from "./Down";

interface Props {
  style?: React.CSSProperties;
}

export const ArrowRightIcon = ({ style }: Props) => {
  return <ArrowDownIcon style={{ ...style, transform: "rotate(-90deg)" }} />;
};
