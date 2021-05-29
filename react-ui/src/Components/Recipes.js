import { Fragment } from "react";
import { connect } from "react-redux";
import { FaPlusSquare } from "react-icons/fa";
import styled from "styled-components";
import { transformSelectedCocktails } from "../Redux/store";
import IngredientList from "./IngredientList";
import UnitSelectionRow from "./UnitSelectionRow";

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

const Recipes = (props) => {
  if (props.drinkList.size === 0) {
    return (
      <p>
        No selections. Use <FaPlusSquare /> icons to add to list.
      </p>
    );
  }

  const contents = transformSelectedCocktails(
    props.drinkList,
    props.cocktails,
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

const mapStateToProps = ({ app }) => ({
  drinkList: app.drinkList,
  cocktails: app.data,
});

export default connect(mapStateToProps)(Recipes);
