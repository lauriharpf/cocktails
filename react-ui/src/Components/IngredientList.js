import AmountAndUnit from "../AmountAndUnit";

const IngredientList = (props) => {
  const ingredients = props.ingredients.map((ingredient) => {
    const key = ingredient.name + "_" + ingredient.unit;
    return (
      <li key={key}>
        <AmountAndUnit unit={ingredient.unit} amount={ingredient.amount} />{" "}
        <span className="capitalize">{ingredient.name}</span>
      </li>
    );
  });

  return <ul>{ingredients}</ul>;
};

export default IngredientList;
