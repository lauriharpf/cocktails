import React from 'react';
import CocktailButton from './CocktailButton.jsx';

export default class CocktailGrid extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentWillMount() {
        var component = this;

        function cocktailImageUrl(azureStorageUrl, imageName) {
            return imageName ? (azureStorageUrl + imageName) : "/Content/Images/cocktail_no_image_small.jpg";
        }

        var azureStoragePromise = $.get("/api/configuration");
        var cocktailsPromise = $.get(this.props.url);

        $.when(azureStoragePromise, cocktailsPromise)
            .done(function (azureStorageUrlData, cocktailsData) {
                $(cocktailsData[0]).each((index, item) => item.Image = cocktailImageUrl(azureStorageUrlData[0] + "/", item.Image));
                component.setState({ data: cocktailsData[0] });
            })
            .fail(function() {
                alert("Sorry! Fetching cocktails went horribly wrong. Try refreshing the page.");
            });
    }

    render() {
        var cocktails = this.state.data.map(function(cocktail) {
            return (
                <CocktailButton key={cocktail.ID} cocktail={cocktail} />
            );
        });
        return (
            <div className="container-fluid">
                <div className="row">
                    {cocktails}
                </div>
            </div>
        );
    }
}