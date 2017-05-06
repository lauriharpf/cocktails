import React from 'react';

export default class CocktailDetails extends React.Component {

    constructor(props) {
        super(props);
    }

    unitToString(unit) {
          switch (unit) {
        case 0:
            return "cl";
        case 1:
            return "Teaspoon(s)";
        case 2:
            return "Item(s)";
        case 3:
            return "";
        case 4:
            return "Dash(es) of";
        }

        return "";  
    }

    render() {
        var that = this;
        var recipeRows = this.props.cocktail.RecipeRows.map(function(recipeRow) {
            var unit = that.unitToString(recipeRow.Unit);
            var amount = recipeRow.Amount > 0 ? recipeRow.Amount : "";
            var amountAndUnit = amount + (unit.length > 0 ? " " + unit : "");

            return (
                <li key={recipeRow.ID}>{amountAndUnit} <span className="capitalize">{recipeRow.Ingredient.Name}</span></li>
            );
        });
        return (
            <div className="modal fade cocktailDetails" id={"modal" + this.props.cocktail.ID} tabIndex="-1" role="dialog" aria-labelledby={"modalLabel" + this.props.cocktail.ID} aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id={"modalLabel" + this.props.cocktail.ID}>{this.props.cocktail.Name}</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <img src={this.props.cocktail.Image} className="responsiveImage" />
                                </div>
                                <div className="col-sm-6">
                                    <h6>Ingredients</h6>
                                    <ul>{recipeRows}</ul>

                                    <h6>Instructions</h6>
                                    {this.props.cocktail.Instructions}

                                    <div className="wikipediaLicense">
                                            Recipe based on Wikipedia article&nbsp;
                                            <a href={this.props.cocktail.WikipediaArticleUri}>{this.props.cocktail.Name}</a>
                                            &nbsp;(<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>).
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}