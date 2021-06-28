import { useContext } from "react";
import { DrinkListContext } from "../DrinkListProvider";

export const UnitSelector = ({ name }) => {
  const { metric, setMetric } = useContext(DrinkListContext);
  var ozChecked = !metric ? "checked" : "";
  var clChecked = metric ? "checked" : "";

  return (
    <div>
      <div className="form-check form-check-inline">
        <label className="form-check-label">
          <input
            className="form-check-input"
            type="radio"
            name={name}
            value="oz"
            onChange={() => setMetric(false)}
            checked={ozChecked}
          />{" "}
          Oz
        </label>
      </div>
      <div className="form-check form-check-inline">
        <label className="form-check-label">
          <input
            className="form-check-input"
            type="radio"
            name={name}
            value="cl"
            onChange={() => setMetric(true)}
            checked={clChecked}
          />{" "}
          Cl
        </label>
      </div>
    </div>
  );
};
