import React, { Fragment, useContext } from "react";
import { FaPlusSquare, FaMinusSquare, FaTrashAlt } from "react-icons/fa";
import { DrinkListContext } from "./DrinkListProvider";

export const DrinkListItem = ({ cocktail, count }) => {
  const { changeDrinkCount, removeDrink } = useContext(DrinkListContext);
  const onPlusClick = () => changeDrinkCount(cocktail.id, 1);
  const onMinusClick = () => changeDrinkCount(cocktail.id, -1);

  return (
    <Fragment>
      <img src={cocktail.thumbnail} style={{ height: 30, width: 30 }} alt="" />
      <FaPlusSquare onClick={onPlusClick} style={{ cursor: "pointer" }} />
      <FaMinusSquare onClick={onMinusClick} style={{ cursor: "pointer" }} />
      <span className="itemName" style={{ fontSize: "16px" }}>
        {count} x {cocktail.name}
      </span>
      <FaTrashAlt
        className="removeAll"
        onClick={() => removeDrink(cocktail.id)}
      />
    </Fragment>
  );
};
