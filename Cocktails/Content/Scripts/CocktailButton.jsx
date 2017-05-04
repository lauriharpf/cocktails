import React from 'react';
import CocktailDetails from './CocktailDetails.jsx';

export default class CocktailButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <div className="col-12 col-sm-4 col-lg-3 col-xl-2 cocktailButton" style={{ textAlign: "center"}} data-toggle="modal" data-target={"#modal" + this.props.cocktail.ID}>
                <div className="buttonStyle left">
                    <img src={this.props.cocktail.Image} width="50" height="78" className="left" />
                    <span>{this.props.cocktail.Name}</span>
                </div>
                    <CocktailDetails cocktail={this.props.cocktail} />
            </div>
        );
    }
}