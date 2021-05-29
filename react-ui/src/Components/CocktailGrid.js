import React, { Component } from 'react';
import { connect } from 'react-redux';
import CocktailButton from './CocktailButton';
import { forceCheck } from 'react-lazyload';

class CocktailGrid extends Component {

    componentDidUpdate() {       
        forceCheck();  // Check if any new thumbnails are now visible and must be loaded
    }

    render() {
        const cocktails = this.props.cocktails.map((cocktail) => {
            if (this.props.filter && !cocktail.name.toLowerCase().startsWith(this.props.filter)) {
                return null;
            }

            const count = this.props.drinkList.has(cocktail.id) ? this.props.drinkList.get(cocktail.id) : 0;
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
    }
}

const mapStateToProps = ({ app }) => ({
    cocktails: app.data,
    drinkList: app.drinkList,
    filter: app.filter
});

export default connect(mapStateToProps)(CocktailGrid);