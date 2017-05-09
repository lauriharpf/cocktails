import React from 'react';
import DrinkListItem from './DrinkListItem.jsx';

export default class DrinkList extends React.Component {
    buildDrinkList(drinkList, cocktails, changeDrinkCount) {
        return Array.from(drinkList.entries()).map((keyToValue) => {
            var cocktail = cocktails.find(x => x.ID === keyToValue[0]);
            return (
                <DrinkListItem cocktail={cocktail} count={keyToValue[1]} changeDrinkCount={changeDrinkCount} />
            );
        });
    }

    render() {
        const content = this.props.drinkList.size > 0 ? 
            <ul className="shopping-cart-items">{this.buildDrinkList(this.props.drinkList, this.props.cocktails, this.props.changeDrinkCount)}</ul> :
            <p>Thirsty? Use <i className="fa fa-plus-square"></i> icons to add to list.</p>;
        return (
            <div>{content}</div>
        );
    }
}