import React from 'react';
import { connect } from 'react-redux';
import DrinkListItem from './DrinkListItem';
import { FaPlusSquare } from 'react-icons/fa';

class DrinkList extends React.Component {
    buildDrinkList(drinkList, cocktails) {
        return Array.from(drinkList.entries()).map((keyToValue) => {
            var cocktail = cocktails.find(x => x.id === keyToValue[0]);
            return (
                <DrinkListItem key={cocktail.id} cocktail={cocktail} count={keyToValue[1]} />
            );
        });
    }

    render() {
        const content = this.props.drinkList.size > 0 ? 
            <ul className="shopping-cart-items">{this.buildDrinkList(this.props.drinkList, this.props.cocktails)}</ul> :
            <p>Thirsty? Use <FaPlusSquare /> icons to add to list.</p>;
        return (
            <div>{content}</div>
        );
    }
}

const mapStateToProps = ({ app }) => ({
    cocktails: app.data,
    drinkList: app.drinkList
});

export default connect(mapStateToProps)(DrinkList);