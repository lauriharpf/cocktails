const changeDrinkCount = (drinkList, cocktailId, changeBy) => {
    let count = drinkList.has(cocktailId) ? drinkList.get(cocktailId) : 0;    
    count += changeBy;
    const newDrinkList = new Map(drinkList);

    if (count > 0) {
        newDrinkList.set(cocktailId, count);
    } else if (drinkList.has(cocktailId)) {
        newDrinkList.delete(cocktailId);
    }
    return newDrinkList;
};

const initialState = { drinkList: new Map(), data: [], showDrinkList: true, metric: false };
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'TOGGLE_DRINK_LIST':
            return {
                ...state,
                showDrinkList: !state.showDrinkList
            };
        case 'SET_METRIC':
            return {
                ...state,
                metric: action.value
            };
        case 'CHANGE_DRINK_COUNT':
            const newDrinkList = changeDrinkCount(state.drinkList, action.cocktailId, action.value);
            return {
                ...state,
                drinkList: newDrinkList
            };
        case 'REMOVE_DRINK':
            const nextDrinkList = new Map(state.drinkList);
            nextDrinkList.delete(action.cocktailId);
            return {
                ...state,
                drinkList: nextDrinkList
            };
        case 'SET_DATA':
            return {
                ...state,
                data: action.value
            }
    }
    
    return state;
};

export default reducer; 