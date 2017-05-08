import React from 'react';
import CocktailButton from './CocktailButton.jsx';

const CocktailGrid = (props) => {
    var cocktails = props.cocktails.map((cocktail) => {
        return (
            <CocktailButton key={cocktail.ID} cocktail={cocktail} handlePlusClick={props.handlePlusClick} />
        );
    });
    return (
        <div className="col-12">
            <div className="row justify-content-center">
                {cocktails}
            </div>
        </div>
    );
}

export default CocktailGrid;