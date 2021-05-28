import reducer, { initialState } from '../Redux/reducers';
import { toggleDrinkList, setMetric, changeDrinkCount, removeDrink, setData } from '../Redux/actions';

test('Returns initial state on undefined state and unknown action', () => {
    expect(reducer(undefined, 'FOO')).toEqual(initialState);
});

/* Tests for drinklist visibility */
const drinkListHiddenState = { ...initialState, showDrinkList: false };
const drinkListVisibleState = { ...initialState, showDrinkList: true };

test('Shows drinklist when toggle action dispatched and drinklist hidden', () => {
    expect(reducer(drinkListHiddenState, toggleDrinkList())).toEqual(drinkListVisibleState);
});
test('Hides drinklist when toggle action dispatched and drinklist is visible', () => {
    expect(reducer(drinkListVisibleState, toggleDrinkList())).toEqual(drinkListHiddenState);
});

/* Tests for selected unit (cl/oz) */
const metricNotSelectedState = { ...initialState, metric: false };
const metricSelectedState = { ...initialState, metric: true };

test('Sets unit to metric when action dispatched and unit not metric', () => {
    expect(reducer(metricNotSelectedState, setMetric(true))).toEqual(metricSelectedState);
});

test('Sets unit to oz when action dispatched and unit is metric', () => {
    expect(reducer(metricSelectedState, setMetric(false))).toEqual(metricNotSelectedState);
});

test('Does not change state when metric selected and metric action dispatched', () => {
    expect(reducer(metricSelectedState, setMetric(true))).toEqual(metricSelectedState);
});

/* Tests for changing selected drink count */
const drinkListEmptyState = { ...initialState, drinkList: new Map() };
const drinkListHasDrinkState = { ...initialState, drinkList: new Map([[0, 1]]) };
const drinkListHasDrinksState = { ...initialState, drinkList: new Map([[0, 1], [1, 2]]) };

test('Adding a selected drink to empty state', () => {
    expect(reducer(drinkListEmptyState, changeDrinkCount(0, 1))).toEqual(drinkListHasDrinkState);
});

test('Removing selected drink completely', () => {
    expect(reducer(drinkListHasDrinkState, changeDrinkCount(0, -1))).toEqual(drinkListEmptyState);
});

test('Incremeting selected drink count', () => {    
    expect(reducer(drinkListHasDrinksState, changeDrinkCount(1, 1)).drinkList.get(1)).toEqual(3);
});

test('Decrementing selected drink count', () => {    
    expect(reducer(drinkListHasDrinksState, changeDrinkCount(1, -1)).drinkList.get(1)).toEqual(1);
});

/* Test for removing a selected drink completely */
test('Removing a drink from the state', () => {
    expect(reducer(drinkListHasDrinksState, removeDrink(1))).toEqual(drinkListHasDrinkState);
});

test('Removing a drink that does not exist in the state', () => {
    expect(reducer(drinkListHasDrinkState, removeDrink(1))).toEqual(drinkListHasDrinkState);
});

/* Tests for setting the list of all selectable cocktails */
const noCocktailsState = { ...initialState, data: [] };
const cocktails = [{ ID: 1, Name: "Agent Orange" }];
const oneCocktailState = { ...initialState, data: cocktails };

test('Setting list of cocktails', () => {
    expect(reducer(noCocktailsState, setData(cocktails))).toEqual(oneCocktailState);
});