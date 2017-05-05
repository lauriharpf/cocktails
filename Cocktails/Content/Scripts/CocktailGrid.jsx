import React from 'react';
import CocktailButton from './CocktailButton.jsx';

export default class CocktailGrid extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        var that = this;
        var cocktails = this.props.cocktails.map(function(cocktail) {
            return (
                <CocktailButton key={cocktail.ID} cocktail={cocktail} handlePlusClick={that.props.handlePlusClick} />
            );
        });
        return (
            <div className="col-12">
                <div className="row">
                    {cocktails}
                </div>
            </div>
        );
    }
}