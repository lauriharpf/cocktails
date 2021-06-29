import styled from "styled-components";
import { TabName } from "../Selections";

interface Props {
  selectedTab: TabName;
  setSelectedTab: React.Dispatch<React.SetStateAction<TabName>>;
  name: TabName;
  text: string;
}

export const SelectionTab = ({
  selectedTab,
  setSelectedTab,
  name,
  text,
}: Props) => {
  const selectedClass = selectedTab === name ? "active" : "";

  return (
    <li className="nav-item">
      <Link
        className={"nav-link " + selectedClass}
        onClick={() => setSelectedTab(name)}
      >
        {text}
      </Link>
    </li>
  );
};

const Link = styled.a`
  padding: 0.5rem 0.5rem;
`;
