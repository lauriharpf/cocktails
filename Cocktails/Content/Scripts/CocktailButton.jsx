import React from 'react';
import CocktailDetails from './CocktailDetails.jsx';

export default class CocktailButton extends React.Component {

    constructor(props) {
        super(props);
        this.onPlusClick = this.onPlusClick.bind(this);
    }

    onPlusClick() {
        this.props.handlePlusClick(this.props.cocktail.ID, 1);
    }

    render() {
        const modalTarget = "#modal" + this.props.cocktail.ID;
        const background = "url(" + this.props.cocktail.Image + ")";
        const count = this.props.drinkList.has(this.props.cocktail.ID) ? this.props.drinkList.get(this.props.cocktail.ID) : 0;

        return ( 
            <div className="col-1 cocktailButton noselect">
                <div className="buttonStyle left" style={{ backgroundImage: background }}>
                    <div className="openDetails" data-toggle="modal" data-target={modalTarget}>
                        <div className="cocktailName">
                            {this.props.cocktail.Name}
                        </div>
                    </div>
                    <div className="actions">
                        {count > 0 && <div className="badge">{count}</div>}
                        <span className="icon-plus-square plusIcon" onClick={this.onPlusClick}></span>
                    </div>
                </div>
                    <CocktailDetails cocktail={this.props.cocktail} setMetric={this.props.setMetric} metric={this.props.metric} />
            </div>
        );
    }
}