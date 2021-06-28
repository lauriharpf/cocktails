/*global FB*/
import React, { useContext } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import CocktailDatabase from "../CocktailDatabase";
import { DrinkListContext } from "../DrinkListProvider";
import { useLocation } from "react-router-dom";

const shareOverrideOGMeta = (
  overrideLink,
  overrideTitle,
  overrideDescription,
  overrideImage
) => {
  FB.ui(
    {
      method: "share_open_graph",
      action_type: "og.likes",
      action_properties: JSON.stringify({
        object: {
          "og:url": overrideLink,
          "og:title": overrideTitle,
          "og:description": overrideDescription,
          "og:image": overrideImage,
        },
      }),
    },
    function (response) {
      // Action after response
    }
  );
};

const createDescription = (drinkList, cocktails) => {
  if (!drinkList || Object.keys(drinkList).length === 0) {
    return "Friends coming over for cocktails? Find tasty cocktail recipes and check what ingredients you need.";
  }

  return Object.entries(drinkList)
    .map((keyToValue) => {
      var cocktail = cocktails.find((x) => x.id === parseInt(keyToValue[0]));
      return keyToValue[1] + "x " + cocktail.name;
    })
    .join(", ");
};

const createTitle = (drinkList) => {
  return !drinkList || Object.keys(drinkList).length === 0
    ? "Cocktails World"
    : "Drinks and Ingredients Needed";
};

export const FacebookShare = () => {
  const { drinkList } = useContext(DrinkListContext);
  const location = useLocation();
  const shareUrl = "http://www.cocktailsworld.eu" + location.pathname;

  return (
    <FaFacebookSquare
      size="2em"
      color="#3b5998"
      style={{ cursor: "pointer" }}
      onClick={() => {
        shareOverrideOGMeta(
          shareUrl,
          createTitle(drinkList),
          createDescription(drinkList, CocktailDatabase),
          "http://www.cocktailsworld.eu/Images/cocktail_og_image.jpg"
        );
      }}
    />
  );
};
