import React from 'react';

export default class DrinkListItem extends React.Component {
    constructor(props) {
        super(props);
        this.onPlusClick = this.onPlusClick.bind(this);
        this.onMinusClick = this.onMinusClick.bind(this);
    }

    onPlusClick() {
        this.props.changeDrinkCount(this.props.cocktail.ID, 1);
    }

    onMinusClick() {
        this.props.changeDrinkCount(this.props.cocktail.ID, -1);
    }

    render() {
        return (
           <li key={this.props.cocktail.ID} className="noselect">
               <img src={this.props.cocktail.Image} style={{ height: 49, width: 30 }} alt="" />
               <span className="item-name">{this.props.count} x {this.props.cocktail.Name} <i className="fa fa-plus-square plusIcon" onClick={this.onPlusClick}></i> <i className="fa fa-minus-square" onClick={this.onMinusClick}></i></span>
           </li>
        );   
    }    
}