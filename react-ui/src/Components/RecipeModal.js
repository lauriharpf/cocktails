import styled from "styled-components";
import { UnitSelector } from "./UnitSelector";
import IngredientList from "./IngredientList";
import CocktailDatabase from "../CocktailDatabase";

const RecipeSource = styled.div`
  margin-top: 10px;
  font-size: smaller;
  font-style: italic;
`;

export const RecipeModal = ({ recipeModalDrinkId }) => {
  const selectedCocktail = recipeModalDrinkId
    ? CocktailDatabase.find((x) => x.id === recipeModalDrinkId)
    : CocktailDatabase[0];
  return (
    <div
      className="modal fade cocktailDetails"
      id="recipeModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="modalLabel">
              {selectedCocktail.name}
            </h4>
            <div className="unitSelector">
              <UnitSelector name="modalUnitSelector" />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-6">
                <img
                  src={selectedCocktail.image}
                  className="responsiveImage"
                  alt={selectedCocktail.name}
                />
              </div>
              <div className="col-sm-6">
                <h6>Ingredients</h6>
                <IngredientList ingredients={selectedCocktail.ingredients} />

                <h6>Instructions</h6>
                {selectedCocktail.instructions}

                <RecipeSource>
                  Recipe courtesy of{" "}
                  <a href="https://www.thecocktaildb.com/">TheCocktailDB</a>.
                </RecipeSource>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
