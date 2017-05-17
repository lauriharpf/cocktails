import React from 'react';
import DrinkListItem from './DrinkListItem.jsx';

export default class DrinkList extends React.Component {
    buildDrinkList(drinkList, cocktails, changeDrinkCount, removeAll) {
        return Array.from(drinkList.entries()).map((keyToValue) => {
            var cocktail = cocktails.find(x => x.ID === keyToValue[0]);
            return (
                <DrinkListItem cocktail={cocktail} count={keyToValue[1]} changeDrinkCount={changeDrinkCount} removeAll={removeAll}/>
            );
        });
    }

    render() {
        const content = this.props.drinkList.size > 0 ? 
            <ul className="shopping-cart-items">{this.buildDrinkList(this.props.drinkList, this.props.cocktails, this.props.changeDrinkCount, this.props.removeAll)}</ul> :
            <p>Thirsty? Use <span className="icon-plus-square"></span> icons to add to list.</p>;
        return (
            <div>{content}</div>
        );
    }
}