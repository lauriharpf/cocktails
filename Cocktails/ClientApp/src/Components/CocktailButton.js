import React from 'react';
import { connect } from 'react-redux';
import { FaPlusSquare } from 'react-icons/fa';
import { changeDrinkCount } from '../Redux/actions';
import CocktailDetails from './CocktailDetails';

class CocktailButton extends React.Component {

    constructor(props) {
        super(props);
        this.onPlusClick = this.onPlusClick.bind(this);
    }

    onPlusClick() {
        this.props.changeDrinkCount(this.props.cocktail.id, 1);
    }

    render() {
        const modalTarget = "#modal" + this.props.cocktail.id;
        const background = "url(" + this.props.cocktail.image + ")";

        return ( 
            <div className="col-1 cocktailButton noselect">
                <div className="buttonStyle left" style={{ backgroundImage: background }}>
                    <div className="openDetails" data-toggle="modal" data-target={modalTarget}>
                        <div className="cocktailName">
                            {this.props.cocktail.name}
                        </div>
                    </div>
                    <div className="actions">
                        {this.props.count > 0 && <div className="badge">{this.props.count}</div>}
                        <FaPlusSquare onClick={this.onPlusClick} style={{ cursor: "pointer" }} />                        
                    </div>
                </div>
                <CocktailDetails cocktail={this.props.cocktail} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeDrinkCount: (cocktailId, changeBy) => dispatch(changeDrinkCount(cocktailId, changeBy))
});

export default connect(null, mapDispatchToProps)(CocktailButton);