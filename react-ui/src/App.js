import { useState } from "react";
import { CocktailGrid } from "./Components/CocktailGrid";
import { Selections } from "./Selections";
import { NavBar } from "./Components/NavBar";
import { RecipeModal } from "./Components/RecipeModal";
import { DrinkListProvider } from "./DrinkListProvider";

export const App = () => {
  const [showSelections, setShowSelections] = useState(true);
  const [filter, setFilter] = useState("");
  const [recipeModalDrinkId, setRecipeModalDrinkId] = useState();
  const toggleShowSelections = () => setShowSelections((state) => !state);
  return (
    <DrinkListProvider>
      <NavBar
        toggleShowSelections={toggleShowSelections}
        setFilter={setFilter}
      />
      <Selections
        showSelections={showSelections}
        toggleShowSelections={toggleShowSelections}
      />
      <div className="container-fluid" style={{ position: "relative" }}>
        <div className="row">
          <CocktailGrid
            filter={filter}
            setRecipeModalDrinkId={setRecipeModalDrinkId}
          />
        </div>
      </div>
      <RecipeModal recipeModalDrinkId={recipeModalDrinkId} />
    </DrinkListProvider>
  );
};
