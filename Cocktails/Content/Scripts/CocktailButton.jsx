import React from 'react';
import CocktailDetails from './CocktailDetails.jsx';

export default class CocktailButton extends React.Component {

    constructor(props) {
        super(props);
        this.onPlusClick = this.onPlusClick.bind(this);
    }

    onPlusClick() {
        this.props.handlePlusClick(this.props.cocktail.ID);
    }

    render() {
        var modalTarget = "#modal" + this.props.cocktail.ID;
        return ( 
            <div className="col-12 col-sm-12 col-lg-4 col-xl-3 cocktailButton" style={{ textAlign: "center"}}>
                <div className="buttonStyle left">
                    <img src={this.props.cocktail.Image} width="50" height="78" className="left" data-toggle="modal" data-target={modalTarget} />
                    <span data-toggle="modal" data-target={modalTarget}>{this.props.cocktail.Name}</span>
                    <div>
                        <i className="fa fa-plus-square" onClick={this.onPlusClick}></i>
                    </div>
                </div>
                    <CocktailDetails cocktail={this.props.cocktail} />
            </div>
        );
    }
}