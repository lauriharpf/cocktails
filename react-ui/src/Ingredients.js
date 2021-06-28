import React, { useContext } from "react";
import { AmountAndUnit } from "./AmountAndUnit";
import UnitSelectionRow from "./Components/UnitSelectionRow";
import { FaPlusSquare } from "react-icons/fa";
import CocktailDatabase from "./CocktailDatabase";
import { DrinkListContext } from "./DrinkListProvider";

export const Ingredients = () => {
  const { drinkList } = useContext(DrinkListContext);

  const calculateNeededIngredients = () => {
    const allIngredientRows = Object.entries(drinkList)
      .map((keyToValue) => {
        const count = keyToValue[1];
        const cocktail = CocktailDatabase.find(
          (x) => x.id === parseInt(keyToValue[0])
        );

        return cocktail.ingredients.map((ingredient) => {
          return {
            amount: ingredient.amount * count,
            unit: ingredient.unit,
            ingredient_name: ingredient.name,
          };
        });
      })
      .reduce((acc, cur) => acc.concat(cur), []);

    var result = Array.from(
      allIngredientRows
        .reduce(function (map, obj) {
          if (map.has(obj.ingredient_name)) {
            map.get(obj.ingredient_name).amount += obj.amount;
          } else {
            map.set(obj.ingredient_name, obj);
          }
          return map;
        }, new Map())
        .entries()
    );

    result.sort((a, b) => {
      return b[1].amount - a[1].amount;
    });

    return result.map((keyToValue) => {
      const item = keyToValue[1];
      return (
        <li key={item.ingredient_name}>
          <AmountAndUnit unit={item.unit} amount={item.amount} />{" "}
          <span style={{ textTransform: "capitalize" }}>
            {item.ingredient_name}
          </span>
        </li>
      );
    });
  };

  const content =
    Object.keys(drinkList).length > 0 ? (
      <div>
        <UnitSelectionRow text="You need" name="ingredientsUnit" />
        <ul>{calculateNeededIngredients()}</ul>
      </div>
    ) : (
      <p>
        No selections. Use <FaPlusSquare /> icons to add to list.
      </p>
    );

  return (
    <div>
      <ul>{content}</ul>
    </div>
  );
};
