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
                <li key={cocktailId}>{count} x {cocktail.Name}</li>
            );
        });
    }

    render() {
        var hasDrinks = this.props.drinkList.size > 0;
        var message;
        if (hasDrinks) {
            message = <ul style={{listStyleType: 'none'}}>{this.buildDrinkList()}</ul>;
        } else {
            message = <p>Thirsty? Use <i className="fa fa-plus-square"></i> icons to add to list.</p>;
        }

        return (
            <div className="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2 drinkListWrapper">
                <div className="drinkList">
                    <h4>Selected drinks</h4>                    
                    {message}
                </div>
            </div>
        );
    }
}