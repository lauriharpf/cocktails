import React from 'react';
import { connect } from 'react-redux';
import { changeDrinkCount, removeDrink } from './Redux/actions';

class DrinkListItem extends React.Component {
    constructor(props) {
        super(props);
        this.onPlusClick = this.onPlusClick.bind(this);
        this.onMinusClick = this.onMinusClick.bind(this);
    }

    onPlusClick() {
        this.props.changeDrinkCount(this.props.cocktail.id, 1);
    }

    onMinusClick() {
        this.props.changeDrinkCount(this.props.cocktail.id, -1);
    }

    render() {
        return (
           <li key={this.props.cocktail.id} className="noselect">
               <img src={this.props.cocktail.image} style={{ height: 49, width: 30 }} alt="" />                
               <div className="item-name">
                   <span className="addAndRemove">
                       <span className="icon-plus-square plusIcon" onClick={this.onPlusClick}></span> <span className="icon-minus-square" onClick={this.onMinusClick}></span>
                   </span>
                   <span className="itemName">{this.props.count} x {this.props.cocktail.name}</span>
                   <span className="icon-trash removeAll" onClick={() => this.props.removeDrink(this.props.cocktail.id)}></span>
               </div>
           </li>
        );   
    }    
}

const mapDispatchToProps = (dispatch) => ({
    changeDrinkCount: (cocktailId, changeBy) => dispatch(changeDrinkCount(cocktailId, changeBy)),
    removeDrink: (cocktailId) => dispatch(removeDrink(cocktailId))
});

export default connect(null, mapDispatchToProps)(DrinkListItem);