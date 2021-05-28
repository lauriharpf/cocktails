export const toggleDrinkList = () => ({
    type: 'TOGGLE_DRINK_LIST'
});

export const setMetric = (metric) => ({
    type: 'SET_METRIC',
    value: metric
});

export const changeDrinkCount = (cocktailId, changeBy) => ({
    type: 'CHANGE_DRINK_COUNT',
    cocktailId,
    value: changeBy
});

export const removeDrink = (cocktailId) => ({
    type: 'REMOVE_DRINK',
    cocktailId
});

export const setData = (cocktails) => ({
    type: 'SET_DATA',
    value: cocktails
});

export const fetchData = () => ({
    type: 'FETCH_DATA'
});

export const setFilter = (filter) => ({
    type: 'SET_FILTER',
    value: filter
});

export const setRecipeModal = (cocktailId) => ({
    type: 'SET_RECIPE_MODAL',
    value: cocktailId
});

export const setSelectedTab = (selectedTab) => ({
    type: 'SET_SELECTED_TAB',
    value: selectedTab
});