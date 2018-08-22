import React from 'react';
import AmountAndUnit from './../AmountAndUnit';
import UnitSelector from './UnitSelector';

const CocktailDetails = (props) => {
    var recipeRows = props.cocktail.recipeRows.map((recipeRow) => {
        return (
            <li key={recipeRow.id}><AmountAndUnit unit={recipeRow.unit} amount={recipeRow.amount} /> <span className="capitalize">{recipeRow.ingredient.name}</span></li>
        );
    });
    return (
        <div className="modal fade cocktailDetails" id={"modal" + props.cocktail.id} tabIndex="-1" role="dialog" aria-labelledby={"modalLabel" + props.cocktail.id} aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id={"modalLabel" + props.cocktail.id}>{props.cocktail.name}</h4>
                        <div className="unitSelector">
                            <UnitSelector name={"unit" + props.cocktail.id } />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <img src={props.cocktail.image} className="responsiveImage" alt={props.cocktail.name} />
                            </div>
                            <div className="col-sm-6">
                                <h6>Ingredients</h6>
                                <ul>{recipeRows}</ul>

                                <h6>Instructions</h6>
                                {props.cocktail.instructions}

                                <div className="wikipediaLicense">
                                        Recipe based on Wikipedia article&nbsp;
                                        <a href={props.cocktail.WikipediaArticleUri}>{props.cocktail.name}</a>
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

export default CocktailDetails;