import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import AmountAndUnit from './../AmountAndUnit';
import UnitSelector from './UnitSelector';

const RecipeSource = styled.div`
    margin-top: 10px;
    font-size: smaller;
    font-style: italic;
`;

const RecipeModal = (props) => {
    var recipeRows = props.cocktail.ingredients.map((ingredient) => {
        const key = ingredient.name + "_" + ingredient.unit + "_" + props.cocktail.id;
        return <li key={key}><AmountAndUnit unit={ingredient.unit} amount={ingredient.amount} /> <span className="capitalize">{ingredient.name}</span></li>;
    }
    );
    return (
        <div className="modal fade cocktailDetails" id="recipeModal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="modalLabel">{props.cocktail.name}</h4>
                        <div className="unitSelector">
                            <UnitSelector name="modalUnitSelector" />
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

                                <RecipeSource>
                                    Recipe courtesy of <a href="https://www.thecocktaildb.com/">TheCocktailDB</a>.
                                </RecipeSource>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ app }) => {    
    const selectedCocktail = app.recipeModal ? app.data.find(x => x.id === app.recipeModal) : app.data[0];
    return { cocktail: selectedCocktail };
};

export default connect(mapStateToProps)(RecipeModal);