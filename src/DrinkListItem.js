import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { changeDrinkCount, removeDrink } from './Redux/actions';
import { FaPlusSquare, FaMinusSquare, FaTrashAlt } from 'react-icons/fa';

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
           <Fragment>
                <img src={this.props.cocktail.thumbnail} style={{ height: 30, width: 30 }} alt="" />                               
                <FaPlusSquare onClick={this.onPlusClick} style={{ cursor: "pointer" }} />
                <FaMinusSquare onClick={this.onMinusClick} style={{ cursor: "pointer" }} />
               <span className="itemName" style={{ fontSize: "16px" }}>{this.props.count} x {this.props.cocktail.name}</span>
               <FaTrashAlt className="removeAll" onClick={() => this.props.removeDrink(this.props.cocktail.id)} />                   
           </Fragment>
        );   
    }    
}

const mapDispatchToProps = (dispatch) => ({
    changeDrinkCount: (cocktailId, changeBy) => dispatch(changeDrinkCount(cocktailId, changeBy)),
    removeDrink: (cocktailId) => dispatch(removeDrink(cocktailId))
});

export default connect(null, mapDispatchToProps)(DrinkListItem);