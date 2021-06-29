import { FaWindowClose } from "react-icons/fa";
import styled from "styled-components";
import { TabName } from "../Selections";
import { SelectionTab } from "./SelectionTab";

interface Props {
  toggleShowSelections: () => void;
  selectedTab: TabName;
  setSelectedTab: React.Dispatch<React.SetStateAction<TabName>>;
}

export const SelectionTabs = ({
  toggleShowSelections,
  selectedTab,
  setSelectedTab,
}: Props) => {
  return (
    <ul className="nav nav-tabs">
      <SelectionTab
        text="Selections"
        name="selections"
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />
      <SelectionTab
        text="Ingredients"
        name="ingredients"
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />
      <SelectionTab
        text="Recipes"
        name="recipes"
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />
      <CloseTab>
        <CloseIcon size="1.5em" onClick={toggleShowSelections} />
      </CloseTab>
    </ul>
  );
};

const CloseTab = styled.li`
  margin-left: auto;
  align-self: center;
`;

const CloseIcon = styled(FaWindowClose)`
  cursor: pointer;
`;
