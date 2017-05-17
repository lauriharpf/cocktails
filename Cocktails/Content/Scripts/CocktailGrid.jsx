import React from 'react';
import CocktailButton from './CocktailButton.jsx';

const CocktailGrid = (props) => {
    var cocktails = props.cocktails.map((cocktail) => {
        return (
            <CocktailButton key={cocktail.ID} cocktail={cocktail} handlePlusClick={props.handlePlusClick} setMetric={props.setMetric} metric={props.metric} drinkList={props.drinkList} />
        );
    });
    return (
        <div className="col-12 cocktailGrid">
            <div className="row justify-content-center no-gutters">
                {cocktails}
            </div>
        </div>
    );
}

export default CocktailGrid;