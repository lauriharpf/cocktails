import { useState } from "react";
import styled from "styled-components";
import { SelectionTabs } from "./Components/SelectionTabs";
import { DrinkList } from "./DrinkList";
import { Ingredients } from "./Ingredients";
import { Recipes } from "./Components/Recipes";
import { FacebookShare } from "./Components/FacebookShare";

interface Props {
  showSelections: boolean;
  toggleShowSelections: () => void;
}

export const Selections = ({ showSelections, toggleShowSelections }: Props) => {
  const [selectedTab, setSelectedTab] = useState<TabName>("selections");
  const contents = ScrollAreaContents(selectedTab);

  return showSelections ? (
    <div className="shopping-cart" id="drinkList">
      <SelectionTabs
        toggleShowSelections={toggleShowSelections}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <ScrollArea>{contents}</ScrollArea>
      <Divider />
      <FacebookShareContainer>
        <div style={{ paddingRight: "10px" }}>Share on</div>
        <FacebookShare />
      </FacebookShareContainer>
    </div>
  ) : null;
};

export type TabName = "selections" | "ingredients" | "recipes";

const ScrollArea = styled.div`
  overflow: auto;
  max-height: calc(80vh - 110px);
`;

const Divider = styled.hr`
  margin-top: 0px;
  margin-bottom: 0px;
`;

const FacebookShareContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ScrollAreaContents = (selectedTab: TabName) => {
  const tabNameToComponent: Record<TabName, () => JSX.Element> = {
    selections: DrinkList,
    ingredients: Ingredients,
    recipes: Recipes,
  };
  const Component = tabNameToComponent[selectedTab];
  return <Component />;
};
