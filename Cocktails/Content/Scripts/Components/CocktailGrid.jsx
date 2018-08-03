import React from 'react';
import { connect } from 'react-redux';
import CocktailButton from './CocktailButton.jsx';

const CocktailGrid = (props) => {
    var cocktails = props.cocktails.map((cocktail) => {
        const count = props.drinkList.has(cocktail.ID) ? props.drinkList.get(cocktail.ID) : 0;
        return (
            <CocktailButton key={cocktail.ID} cocktail={cocktail} count={count} />
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

const mapStateToProps = (state) => ({
    cocktails: state.data,
    drinkList: state.drinkList
});

export default connect(mapStateToProps)(CocktailGrid);