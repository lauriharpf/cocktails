import { put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import "regenerator-runtime/runtime";

const cocktailImageUrl = (imageName) => {
    return "/Images/" + (imageName ? imageName : "cocktail_no_image_small.jpg");
};

const getDrinkList = (state) => state.app.drinkList;
const getCurrentMetric = (state) => state.app.metric;
const getUrl = (state) => state.router.location.pathname;

function* keepUrlInSync() {    
    let drinkList = yield select(getDrinkList);
    let currentMetric = yield select(getCurrentMetric);

    let url = '/';
    // Any drinks selected? Store them in [cocktail id]-[how many] -syntax to the URL
    if (drinkList) {
        drinkList.forEach((value, key) => {
            url += key + '-' + value + '/';
        });
    }

    // If selected metric is cl, add it to the end
    url += currentMetric ? 'cl/' : '';

    yield put(push(url));
}

function* fetchData() {
    const jsonResult = yield fetch("/api/cocktails")
        .then(resp => {
            if (resp.ok) { return resp.json(); }

            throw new Error("Fetching returned response " + resp.status);

        }).catch(e => {
            console.log("Sorry! Fetching cocktails went horribly wrong! Try refreshing the page.");
        });

    jsonResult.forEach((item) => item.image = cocktailImageUrl(item.image));    
    const currentUrl = yield select(getUrl);

    yield put({ type: 'SET_DATA', value: jsonResult });
    yield put({ type: 'HYDRATE_STATE_FROM_URL', value: currentUrl });
}

export default function* rootSaga() {
    yield takeLatest("FETCH_DATA", fetchData);
    yield takeEvery(['CHANGE_DRINK_COUNT', 'REMOVE_DRINK', 'SET_METRIC'], keepUrlInSync);    
}