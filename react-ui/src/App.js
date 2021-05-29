import { useRef } from "react";
import { connect } from "react-redux";
import { fetchData } from "./Redux/actions";
import CocktailGrid from "./Components/CocktailGrid";
import Selections from "./Selections";
import NavBar from "./Components/NavBar";
import RecipeModal from "./Components/RecipeModal";

const useComponentWillMount = (func) => {
  const willMount = useRef(true);
  if (willMount.current) func();
  willMount.current = false;
};

const App = ({ fetchData }) => {
  useComponentWillMount(fetchData);

  return (
    <div>
      <NavBar />
      <Selections />
      <div className="container-fluid" style={{ position: "relative" }}>
        <div className="row">
          <CocktailGrid />
        </div>
      </div>
      <RecipeModal />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData()),
});

export default connect(null, mapDispatchToProps)(App);
