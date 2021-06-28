import React, { useContext } from "react";
import styled from "styled-components";
import { FaPlusSquare } from "react-icons/fa";
import { DrinkListItem } from "./DrinkListItem";
import CocktailDatabase from "./CocktailDatabase";
import { DrinkListContext } from "./DrinkListProvider";

const DrinkListGrid = styled.ul`
  display: grid;
  grid-template-columns: 30px 24px 24px auto 24px;
  grid-row-gap: 2px;
  column-gap: 2px;
  font-size: 24px;
  align-items: center;
  padding-top: 10px;
`;

export const DrinkList = () => {
  const { drinkList } = useContext(DrinkListContext);
  const selectedDrinkIds = Object.keys(drinkList);

  if (selectedDrinkIds.length === 0) {
    return (
      <div>
        <p>
          Thirsty? Use <FaPlusSquare /> icons to add to list.
        </p>
      </div>
    );
  }

  const content = selectedDrinkIds.map((drinkId) => {
    const cocktail = CocktailDatabase.find(
      (cocktail) => cocktail.id.toString() === drinkId
    );
    const count = drinkList[drinkId];
    return (
      <DrinkListItem key={cocktail.id} cocktail={cocktail} count={count} />
    );
  });

  return (
    <div>
      <DrinkListGrid className="noselect">{content}</DrinkListGrid>
    </div>
  );
};
