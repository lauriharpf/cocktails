import React, { useContext } from "react";
import { DrinkListContext } from "./DrinkListProvider";

export const AmountAndUnit = (props) => {
  const { metric } = useContext(DrinkListContext);
  let unit = "";
  switch (props.unit) {
    case "cl":
      unit = metric ? "cl" : "oz";
      break;
    default:
      unit = props.unit;
  }

  let amount = "";
  if (props.amount > 0) {
    // Convert to oz as appropriate.
    amount =
      props.unit === "cl" && !metric ? props.amount * 0.333 : props.amount;
    // Round amounts over 0.1 to one decimal, otherwise round to two decimals.
    amount =
      amount > 0.1
        ? Math.round(amount * 10) / 10
        : Math.round(amount * 100) / 100;
  }
  var amountAndUnit = amount + (unit.length > 0 ? " " + unit : "");

  return <span>{amountAndUnit}</span>;
};
