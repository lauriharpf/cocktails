import React from 'react';

const DrinkListItem = (props) => {
    return (
        <li key={props.cocktail.Id}>
            <img src={props.cocktail.Image} style={{ height: 49, width: 30 }} alt="" />
            <span className="item-name">{props.count} x {props.cocktail.Name}</span>                
        </li>
    );
}

export default DrinkListItem;
