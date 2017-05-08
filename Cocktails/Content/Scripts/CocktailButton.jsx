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
        const modalTarget = "#modal" + this.props.cocktail.ID;
        return ( 
            <div className="col-1 cocktailButton">
                <div className="buttonStyle left">
                    <div>
                        <img src={this.props.cocktail.Image} width="50" height="78" className="left openDetails noselect" data-toggle="modal" data-target={modalTarget} />
                    </div>
                    <div className="textArea">
                        <span className="openDetails" data-toggle="modal" data-target={modalTarget}>{this.props.cocktail.Name}</span>
                        <div className="plusIconWrapper">
                            <i className="fa fa-2x fa-plus-square plusIcon" onClick={this.onPlusClick}></i>
                        </div>
                    </div>
                </div>
                    <CocktailDetails cocktail={this.props.cocktail} />
            </div>
        );
    }
}