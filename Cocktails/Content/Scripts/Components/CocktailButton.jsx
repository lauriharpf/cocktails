import React from 'react';
import { connect } from 'react-redux';
import { changeDrinkCount } from '../Actions.jsx';
import CocktailDetails from './CocktailDetails.jsx';

class CocktailButton extends React.Component {

    constructor(props) {
        super(props);
        this.onPlusClick = this.onPlusClick.bind(this);
    }

    onPlusClick() {
        this.props.changeDrinkCount(this.props.cocktail.ID, 1);
    }

    render() {
        const modalTarget = "#modal" + this.props.cocktail.ID;
        const background = "url(" + this.props.cocktail.Image + ")";

        return ( 
            <div className="col-1 cocktailButton noselect">
                <div className="buttonStyle left" style={{ backgroundImage: background }}>
                    <div className="openDetails" data-toggle="modal" data-target={modalTarget}>
                        <div className="cocktailName">
                            {this.props.cocktail.Name}
                        </div>
                    </div>
                    <div className="actions">
                        {this.props.count > 0 && <div className="badge">{this.props.count}</div>}
                        <span className="icon-plus-square plusIcon" onClick={this.onPlusClick}></span>
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