import React from 'react';
import { connect } from 'react-redux';
import AmountAndUnit from './AmountAndUnit';
import UnitSelector from './Components/UnitSelector';
import { FaPlusSquare } from 'react-icons/fa';

class Ingredients extends React.Component {
    constructor(props) {
        super(props);
        this.calculateNeededIngredients = this.calculateNeededIngredients.bind(this);
    }

    calculateNeededIngredients() {
        const allIngredientRows = Array.from(this.props.drinkList.entries()).map((keyToValue) => {
            const count = keyToValue[1];
            const cocktail = this.props.cocktails.find(x => x.id === keyToValue[0]);

            return cocktail.ingredients.map((ingredient) => {
                return { amount: ingredient.amount * count, unit: ingredient.unit, ingredient_name: ingredient.name };
            });
        }).reduce((acc, cur) => acc.concat(cur), []);


        var result = Array.from(allIngredientRows.reduce(function(map, obj) {
            if (map.has(obj.ingredient_name)) {
                map.get(obj.ingredient_name).amount += obj.amount;
            } else {
                map.set(obj.ingredient_name, obj);
            }
            return map;
        }, new Map()).entries());

        result.sort((a, b) => {
            return b[1].amount - a[1].amount;
        });

        return result.map((keyToValue) => {
            const item = keyToValue[1];            
            return <li key={item.ingredient_name}><AmountAndUnit unit={item.unit} amount={item.amount} /> <span style={{textTransform: 'capitalize'}}>{item.ingredient_name}</span></li>;
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
            (<p>No selections. Use <FaPlusSquare /> icons to add to list.</p>);
        
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