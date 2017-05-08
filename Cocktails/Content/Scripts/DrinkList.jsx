import React from 'react';

export default class DrinkList extends React.Component {
    constructor(props) {
        super(props);
        this.buildDrinkList = this.buildDrinkList.bind(this);
    }

    buildDrinkList() {
        var that = this;
        return Array.from(this.props.drinkList.entries()).map(function(keyToValue) {
            var cocktailId = keyToValue[0];
            var count = keyToValue[1];
            var cocktail = that.props.cocktails.find(x => x.ID === cocktailId);
            return (
                <li key={cocktailId}>
                    <img src={cocktail.Image} style={{ height: 49, width: 30 }} alt="" />
                    <span className="item-name">{count} x {cocktail.Name}</span>                
                </li>
            );
        });
     }

    render() {
        var displayClass = this.props.showDrinkList ? "" : "hidden";
        var hasDrinks = this.props.drinkList.size > 0;
        var message;
        if (hasDrinks) {
            message = <ul className="shopping-cart-items">{this.buildDrinkList()}</ul>;
        } else {
            message = <p>Thirsty? Use <i className="fa fa-plus-square"></i> icons to add to list.</p>;
        }

        return (
                <div className={"shopping-cart " + displayClass} id="drinkList">
                {message}
                <button className="btn btn-primary" style={{width: '100%' }} onClick={this.props.toggleDrinkList}>Close</button>
                </div>                
        );
    }
}