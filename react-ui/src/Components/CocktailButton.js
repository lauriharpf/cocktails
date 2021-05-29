/* global $ */
import { connect } from "react-redux";
import styled from "styled-components";
import { FaPlusSquare } from "react-icons/fa";
import LazyLoad from "react-lazyload";
import { changeDrinkCount, setRecipeModal } from "../Redux/actions";

export const CocktailThumbnail = styled.img`
  position: absolute;
  left: 0px;
  top: 0px;
  height: 155px;
  width: 155px;
`;

export const ContentWrapper = styled.div`
  width: 160px;
  min-width: 160px;
  height: 155px;
`;

export const ControlsWrapper = styled.div`
  min-height: 155px;
`;

export const PlusIcon = styled(FaPlusSquare)`
  cursor: pointer;
`;

const CocktailButton = ({
  changeDrinkCount,
  setRecipeModal,
  cocktail,
  count,
}) => {
  const onOpenClick = () => {
    setRecipeModal(cocktail.id); // Fill the RecipeModal with data for this cocktail
    $("#recipeModal").modal(); // Open the modal
  };

  return (
    <ContentWrapper className="col-1 cocktailButton noselect">
      <LazyLoad
        height={155}
        offset={200}
        once
        placeholder={
          <CocktailThumbnail src="/Images/cocktail_no_image_small.jpg" />
        }
      >
        <CocktailThumbnail src={cocktail.thumbnail} />
      </LazyLoad>
      <ControlsWrapper className="buttonStyle left">
        <div className="openDetails" onClick={onOpenClick}>
          <div className="cocktailName">{cocktail.name}</div>
        </div>
        <div className="actions">
          {count > 0 && <div className="badge">{count}</div>}
          <PlusIcon
            onClick={() => {
              changeDrinkCount(cocktail.id, 1);
            }}
          />
        </div>
      </ControlsWrapper>
    </ContentWrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeDrinkCount: (cocktailId, changeBy) =>
    dispatch(changeDrinkCount(cocktailId, changeBy)),
  setRecipeModal: (cocktailId) => dispatch(setRecipeModal(cocktailId)),
});

export default connect(null, mapDispatchToProps)(CocktailButton);
