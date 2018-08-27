import React from 'react';
import { connect } from 'react-redux';
import CocktailButton from './CocktailButton';

const CocktailGrid = (props) => {
    var cocktails = props.cocktails.map((cocktail) => {
        if (props.filter && !cocktail.name.toLowerCase().startsWith(props.filter)) {
            return null;
        }

        const count = props.drinkList.has(cocktail.id) ? props.drinkList.get(cocktail.id) : 0;
        return (
            <CocktailButton key={cocktail.id} cocktail={cocktail} count={count} />
        );
    });
    return (
        <div className="col-12 cocktailGrid">
            <div className="row justify-content-center no-gutters">
                {cocktails}
            </div>
        </div>
    );
};

const mapStateToProps = ({ app }) => ({
    cocktails: app.data,
    drinkList: app.drinkList,
    filter: app.filter
});

export default connect(mapStateToProps)(CocktailGrid);