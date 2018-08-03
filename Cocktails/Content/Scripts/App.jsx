import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { setData } from './Actions.jsx';
import store from './Store.jsx';
import CocktailGrid from './Components/CocktailGrid.jsx';
import Selections from './Selections.jsx';
import NavBar from './Components/NavBar.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const cocktailImageUrl = (azureStorageUrl, imageName) => {
            return imageName ? (azureStorageUrl + imageName) : "/Content/Images/cocktail_no_image_small.jpg";
        };

        const azureStorageUrl = "/api/configuration";
        const cocktailsUrl = "/api/cocktails";

        let fetchFailures = false;
        const jsonPromises = [azureStorageUrl, cocktailsUrl].map(url => fetch(url).then(resp =>
        {
            if (resp.ok) { return resp.json() }
            fetchFailures = true;
        }
        ));

        Promise.all(jsonPromises)
            .then(responses =>        
            {
                if (fetchFailures) {
                    const errorMessage = "Sorry! Fetching cocktails went horribly wrong! Try refreshing the page.";
                    alert(errorMessage);
                    throw new Error(errorMessage);
                }

                responses[1].forEach((item, index) => item.Image = cocktailImageUrl(responses[0] + "/", item.Image));
                this.props.setData(responses[1]);
            });
    }

    render() {
        return (       
           <div>
               <NavBar />
               <Selections />
               <div className="container-fluid" style={{position: 'relative' }}>
                   <div className="row">
                       <CocktailGrid />
                   </div>
               </div>
           </div>
       );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setData: (data) => dispatch(setData(data))
});

App = connect(null, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById("content"));