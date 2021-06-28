import React, { useState } from "react";
import styled from "styled-components";
import { SelectionTabs } from "./Components/SelectionTabs";
import { DrinkList } from "./DrinkList";
import { Ingredients } from "./Ingredients";
import { Recipes } from "./Components/Recipes";
import { FacebookShare } from "./Components/FacebookShare";

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

const ScrollAreaContents = (selectedTab) => {
  switch (selectedTab) {
    case "selections":
      return <DrinkList />;
    case "ingredients":
      return <Ingredients />;
    case "recipes":
      return <Recipes />;
    default:
      return <DrinkList />;
  }
};

export const Selections = ({ showSelections, toggleShowSelections }) => {
  const [selectedTab, setSelectedTab] = useState("selections");
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
