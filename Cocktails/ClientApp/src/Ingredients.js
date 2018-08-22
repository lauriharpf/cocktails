import React from 'react';
import { connect } from 'react-redux';
import AmountAndUnit from './AmountAndUnit';
import UnitSelector from './Components/UnitSelector';

class Ingredients extends React.Component {
    constructor(props) {
        super(props);
        this.calculateNeededIngredients = this.calculateNeededIngredients.bind(this);
    }

    calculateNeededIngredients() {
        const allIngredientRows = Array.from(this.props.drinkList.entries()).map((keyToValue) => {
            const count = keyToValue[1];
            const cocktail = this.props.cocktails.find(x => x.id === keyToValue[0]);
            
            return cocktail.recipeRows.map((recipeRow) => {
                return { amount: recipeRow.amount * count, unit: recipeRow.unit, ingredient_id: recipeRow.ingredient.id, ingredient_name: recipeRow.ingredient.name };
            });
        }).reduce((acc, cur) => acc.concat(cur), []);


        var result = Array.from(allIngredientRows.reduce(function(map, obj) {
            if (map.has(obj.ingredient_id)) {
                map.get(obj.ingredient_id).amount += obj.amount;
            } else {
                map.set(obj.ingredient_id, obj);
            }
            return map;
        }, new Map()).entries());

        result.sort((a, b) => {
            return b[1].amount - a[1].amount;
        });

        return result.map((keyToValue) => {
            const item = keyToValue[1];            
            return <li key={item.ingredient_id}><AmountAndUnit unit={item.unit} amount={item.amount} /> <span style={{textTransform: 'capitalize'}}>{item.ingredient_name}</span></li>;
        });
    }

    render() {
        const content = (this.props.drinkList.size > 0) ?
            (<div>
                <div className="clearfix">
                    <div className="float-left"><b>You need</b></div>
                    <div className="float-right"><UnitSelector name="ingredientsUnit" /></div>
                </div>
                <ul>{this.calculateNeededIngredients()}</ul>
            </div>)
            :
            (<p>No selections. Use <span className="icon-plus-square"></span> icons to add to list.</p>);
        
        return (
            <div>
                <ul>
                    {content}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = ({ app }) => ({
    cocktails: app.data,
    drinkList: app.drinkList
});

export default connect(mapStateToProps)(Ingredients);