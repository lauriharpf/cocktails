import { FaWindowClose } from "react-icons/fa";
import styled from "styled-components";
import { SelectionTab } from "./SelectionTab";

const CloseTab = styled.li`
  margin-left: auto;
  align-self: center;
`;

const CloseIcon = styled(FaWindowClose)`
  cursor: pointer;
`;

export const SelectionTabs = ({
  toggleShowSelections,
  selectedTab,
  setSelectedTab,
}) => {
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
