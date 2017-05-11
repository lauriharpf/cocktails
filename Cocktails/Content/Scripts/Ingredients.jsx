import React from 'react';
import AmountAndUnit from './AmountAndUnit.jsx';

export default class Ingredients extends React.Component {
    constructor(props) {
        super(props);
        this.calculateNeededIngredients = this.calculateNeededIngredients.bind(this);
    }

    calculateNeededIngredients() {
        const allIngredientRows = Array.from(this.props.drinkList.entries()).map((keyToValue) => {
            const count = keyToValue[1];
            const cocktail = this.props.cocktails.find(x => x.ID === keyToValue[0]);
            
            return cocktail.RecipeRows.map((recipeRow) => {
                return { Amount: recipeRow.Amount * count, Unit: recipeRow.Unit, IngredientID: recipeRow.Ingredient.ID, IngredientName: recipeRow.Ingredient.Name };
            });
        }).reduce((acc, cur) => acc.concat(cur), []);


        var result = Array.from(allIngredientRows.reduce(function(map, obj) {
            if (map.has(obj.IngredientID)) {
                map.get(obj.IngredientID).Amount += obj.Amount;
            } else {
                map.set(obj.IngredientID, obj);
            }
            return map;
        }, new Map()).entries());

        result.sort((a, b) => {
            return b[1].Amount - a[1].Amount;
        });

        return result.map((keyToValue) => {
            let item = keyToValue[1];
            return <li key={item.ID}><AmountAndUnit unit={item.Unit} amount={item.Amount} /> <span style={{textTransform: 'capitalize'}}>{item.IngredientName}</span></li>;
        });
    }

    render() {
        if (this.props.drinkList.size > 0) {
            var content = <div><p><b>You need</b></p><ul>{this.calculateNeededIngredients()}</ul></div>;
        } else {
            var content = <p>No selections. Use <span className="icon-plus-square"></span> icons to add to list.</p>;
        }
        
        return (
            <div>
                <ul>
                    {content}
                </ul>
            </div>
        );
    }
}