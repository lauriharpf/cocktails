import React from 'react';
import DrinkListItem from './DrinkListItem.jsx';

const buildDrinkList = (drinkList, cocktails) => {
    return Array.from(drinkList.entries()).map((keyToValue) => {
        var cocktail = cocktails.find(x => x.ID === keyToValue[0]);
        return (
            <DrinkListItem cocktail={cocktail} count={keyToValue[1]} />
        );
    });
}

const DrinkList = (props) => {
    const displayClass = props.showDrinkList ? "" : "hidden";
    const message = props.drinkList.size > 0 ? 
        <ul className="shopping-cart-items">{buildDrinkList(props.drinkList, props.cocktails)}</ul> :
        <p>Thirsty? Use <i className="fa fa-plus-square"></i> icons to add to list.</p>;

    return (
            <div className={"shopping-cart " + displayClass} id="drinkList">
            {message}
            <button className="btn btn-primary" style={{width: '100%' }} onClick={props.toggleDrinkList}>Close</button>
            </div>                
        );
}

export default DrinkList;