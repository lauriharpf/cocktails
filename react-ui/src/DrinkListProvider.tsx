import React from "react";
import { History } from "history";
import { useHistory, useLocation } from "react-router-dom";

export const DrinkListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const history = useHistory();
  const parsedState = parseStateFrom(location.pathname);
  const metric = parsedState.metric;
  const drinkList = parsedState.drinkList;
  const onSetMetric = (useMetric: boolean) => {
    keepUrlInSync(drinkList, useMetric, history);
  };
  const changeDrinkCount = (cocktailId: string, changeBy: number) => {
    const newAmount = (drinkList[cocktailId] || 0) + changeBy;
    const newDrinkList =
      newAmount > 0
        ? {
            ...drinkList,
            [cocktailId]: newAmount,
          }
        : removeDrinkId(cocktailId, drinkList);
    keepUrlInSync(newDrinkList, metric, history);
    return newDrinkList;
  };

  const removeDrink = (cocktailId: string) => {
    const newDrinkList = removeDrinkId(cocktailId, drinkList);
    keepUrlInSync(newDrinkList, metric, history);
    return newDrinkList;
  };

  return (
    <DrinkListContext.Provider
      value={{
        metric,
        setMetric: onSetMetric,
        drinkList,
        changeDrinkCount,
        removeDrink,
      }}
    >
      {children}
    </DrinkListContext.Provider>
  );
};

const removeDrinkId = (drinkId: string, drinkList: DrinkList) => {
  const { [drinkId]: removedDrinkId, ...newDrinkList } = drinkList;
  return newDrinkList;
};

const parseStateFrom = (
  currentUrl: string
): { drinkList: DrinkList; metric: boolean } => {
  if (currentUrl) {
    // Parse what drinks have been selected and how many of each
    const drinkList: DrinkList = currentUrl
      .split("/")
      .map((kv: string) => kv.split("-"))
      .filter((i: string[]) => i.length === 2)
      .reduce((drinkIdsToAmounts: DrinkList, drink: string[]) => {
        const drinkId = drink[0];
        const amount = parseInt(drink[1], 10);
        drinkIdsToAmounts[drinkId] = amount;
        return drinkIdsToAmounts;
      }, {});

    const metric = currentUrl.includes("/cl/");
    return {
      drinkList,
      metric,
    };
  }

  return {
    drinkList: {},
    metric: false,
  };
};

function keepUrlInSync(
  drinkList: DrinkList,
  metric: boolean,
  history: History
) {
  let url = "/";
  // Any drinks selected? Store them in [cocktail id]-[how many] -syntax to the URL
  if (drinkList) {
    url += Object.entries(drinkList)
      .map((drink) => {
        const key = drink[0];
        const value = drink[1];
        return `${key}-${value}/`;
      })
      .join("");
  }

  // If selected metric is cl, add it to the end
  url += metric ? "cl/" : "";

  history.push(url);
}

interface DrinkListContextProps {
  drinkList: DrinkList;
  metric: boolean;
  setMetric: (metric: boolean) => void;
  changeDrinkCount: (cocktailId: string, changeBy: number) => void;
  removeDrink: (cocktailId: string) => void;
}

export const DrinkListContext = React.createContext<DrinkListContextProps>({
  drinkList: {},
  metric: false,
  setMetric: () => undefined,
  changeDrinkCount: () => undefined,
  removeDrink: () => undefined,
});

interface DrinkList {
  [drinkId: string]: number;
}
