import React from 'react';
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
           <li key={this.props.cocktail.id} className="noselect">
               <img src={this.props.cocktail.image} style={{ height: 49, width: 30 }} alt="" />                
               <div className="item-name">
                    <span className="addAndRemove">
                        <FaPlusSquare onClick={this.onPlusClick} style={{ verticalAlign: "top", cursor: "pointer" }} /> <FaMinusSquare onClick={this.onMinusClick} style={{ verticalAlign: "top", cursor: "pointer", marginLeft: "-5px" }} />
                   </span>
                    <span className="itemName" style={{ marginLeft: "-3px" }}>{this.props.count} x {this.props.cocktail.name}</span>
                    <FaTrashAlt className="removeAll" onClick={() => this.props.removeDrink(this.props.cocktail.id)} />                   
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