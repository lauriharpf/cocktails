import React from 'react';
import ReactDOM from 'react-dom';
import CocktailGrid from './CocktailGrid.jsx';
import DrinkList from './DrinkList.jsx';

class ListBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { drinkList: new Map(), data: [] };
        this.addDrink = this.addDrink.bind(this);
    }

    addDrink(cocktailId) {
        var count = this.state.drinkList.has(cocktailId) ? this.state.drinkList.get(cocktailId) : 0;
        count++;
        var newDrinkList = new Map(this.state.drinkList);
        newDrinkList.set(cocktailId, count);
        this.setState({
            drinkList: newDrinkList
        });
    }

    componentWillMount() {
        var component = this;

        function cocktailImageUrl(azureStorageUrl, imageName) {
            return imageName ? (azureStorageUrl + imageName) : "/Content/Images/cocktail_no_image_small.jpg";
        }

        var azureStoragePromise = $.get("/api/configuration");
        var cocktailsPromise = $.get("/api/cocktails");

        $.when(azureStoragePromise, cocktailsPromise)
            .done(function (azureStorageUrlData, cocktailsData) {
                $(cocktailsData[0]).each((index, item) => item.Image = cocktailImageUrl(azureStorageUrlData[0] + "/", item.Image));
                component.setState({ data: cocktailsData[0] });
            })
            .fail(function() {
                alert("Sorry! Fetching cocktails went horribly wrong! Try refreshing the page.");
            });
    }

    render() {
        return (<div className="container-fluid">
           <div className="row">
               <DrinkList drinkList={this.state.drinkList} cocktails={this.state.data} />
               <CocktailGrid cocktails={this.state.data} handlePlusClick={this.addDrink}/>
           </div>
       </div>);
    }
}

ReactDOM.render(<ListBuilder />, document.getElementById("content"));