import { put, takeLatest, all } from 'redux-saga/effects';
import "regenerator-runtime/runtime";

const cocktailImageUrl = (azureStorageUrl, imageName) => {
    return imageName ? (azureStorageUrl + imageName) : "/Content/Images/cocktail_no_image_small.jpg";
};

function* fetchData() {
    const azureStorageUrl = "/api/configuration";
    const cocktailsUrl = "/api/cocktails";

    let fetchFailures = false;
    const jsonResults = yield all([azureStorageUrl, cocktailsUrl].map(url => fetch(url).then(resp => {
        if (resp.ok) { return resp.json() }
        fetchFailures = true;
    })));

    if (fetchFailures) {
        const errorMessage = "Sorry! Fetching cocktails went horribly wrong! Try refreshing the page.";
        alert(errorMessage);
        throw new Error(errorMessage);
    }

    jsonResults[1].forEach((item, index) => item.Image = cocktailImageUrl(jsonResults[0] + "/", item.Image));
    yield put({ type: 'SET_DATA', value: jsonResults[1] });
}

export default function* rootSaga() {
    yield takeLatest("FETCH_DATA", fetchData);
};