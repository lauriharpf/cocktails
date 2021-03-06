import { useContext, useEffect } from "react";
import { CocktailButton } from "./CocktailButton";
import { forceCheck } from "react-lazyload";
import CocktailDatabase from "../CocktailDatabase";
import { DrinkListContext } from "../DrinkListProvider";

interface Props {
  filter: string;
  setRecipeModalDrinkId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}

export const CocktailGrid = ({ filter, setRecipeModalDrinkId }: Props) => {
  const { drinkList } = useContext(DrinkListContext);

  useEffect(() => {
    forceCheck(); // Check if any new thumbnails are now visible and must be loaded
  });

  const cocktails = CocktailDatabase.map((cocktail) => {
    if (filter && !cocktail.name.toLowerCase().startsWith(filter)) {
      return null;
    }

    const count = drinkList[cocktail.id] ? drinkList[cocktail.id] : 0;
    return (
      <CocktailButton
        key={cocktail.id}
        cocktail={cocktail}
        count={count}
        setRecipeModalDrinkId={setRecipeModalDrinkId}
      />
    );
  });

  return (
    <div className="col-12 cocktailGrid">
      <div className="row justify-content-center g-0">{cocktails}</div>
    </div>
  );
};
