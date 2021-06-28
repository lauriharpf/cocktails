import { Fragment, useContext } from "react";
import { FaPlusSquare } from "react-icons/fa";
import styled from "styled-components";
import IngredientList from "./IngredientList";
import UnitSelectionRow from "./UnitSelectionRow";
import CocktailDatabase from "../CocktailDatabase";
import { DrinkListContext } from "../DrinkListProvider";

const SmallText = styled.span`
  font-size: 0.8rem;
`;

const RecipesContainer = styled.div`
  padding-top: 10px;
`;

const CocktailHeading = styled.h5`
  font-size: 1.1rem;
`;

const SmallHeading = styled.h6`
  font-size: 1rem;
`;

export const Recipes = () => {
  const { drinkList } = useContext(DrinkListContext);

  if (drinkList.size === 0) {
    return (
      <p>
        No selections. Use <FaPlusSquare /> icons to add to list.
      </p>
    );
  }

  const contents = transformSelectedCocktails(
    drinkList,
    CocktailDatabase,
    (cocktail, count) => (
      <div key={cocktail.id}>
        <CocktailHeading>
          {cocktail.name} <SmallText>(make {count})</SmallText>:
        </CocktailHeading>
        <p>{cocktail.instructions}</p>
        <SmallHeading>Ingredients</SmallHeading>
        <IngredientList ingredients={cocktail.ingredients} />
      </div>
    )
  );

  return (
    <Fragment>
      <UnitSelectionRow text="Show in" name="recipesUnit" />
      <RecipesContainer>{contents}</RecipesContainer>
    </Fragment>
  );
};

const transformSelectedCocktails = (
  drinkList,
  allCocktails,
  transformCallback
) => {
  return Object.entries(drinkList).map((keyToValue) => {
    const cocktail = allCocktails.find((x) => x.id === parseInt(keyToValue[0]));
    return transformCallback(cocktail, keyToValue[1]);
  });
};
