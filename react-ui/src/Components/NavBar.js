import { FaShoppingCart } from "react-icons/fa";
import styled from "styled-components";
import { useContext } from "react";
import { DrinkListContext } from "../DrinkListProvider";

const NavBarForm = styled.form`
  width: 100%;
  display: flex;
`;

const NavBarControls = styled.div`
  margin-left: auto;
  display: inherit;
  align-items: center;
`;

const CartButton = styled.button`
  margin-left: 5px;
  height: calc(2.25rem + 2px);
  white-space: nowrap;
`;

export const NavBar = ({ toggleShowSelections, setFilter }) => {
  const { drinkList } = useContext(DrinkListContext);

  const drinkListCount = Array.from(Object.entries(drinkList)).reduce(function (
    acc,
    keyToValue
  ) {
    return acc + keyToValue[1];
  },
  0);

  return (
    <nav className="navbar fixed-top bg-faded">
      <NavBarForm>
        <span className="navbar-brand">Cocktails World</span>
        <NavBarControls>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Find cocktail..."
            aria-label="Find cocktail"
            onChange={(event) => setFilter(event.target.value.toLowerCase())}
            style={{ fontSize: "0.9rem" }}
          />
          <CartButton
            type="button"
            className="btn btn-light float-right"
            onClick={toggleShowSelections}
          >
            <span className="badge">{drinkListCount}</span> <FaShoppingCart />{" "}
            <span className="d-none d-md-inline">Selections</span>
          </CartButton>
        </NavBarControls>
      </NavBarForm>
    </nav>
  );
};
