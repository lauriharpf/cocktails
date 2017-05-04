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
            <div className="col-6 col-sm-7 col-md-8 col-lg-9 col-xl-10">
                <div className="row">
                    {cocktails}
                </div>
            </div>
        );
    }
}