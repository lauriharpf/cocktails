import React from 'react';
import { connect } from 'react-redux';
import DrinkListItem from './DrinkListItem.jsx';

class DrinkList extends React.Component {
    buildDrinkList(drinkList, cocktails) {
        return Array.from(drinkList.entries()).map((keyToValue) => {
            var cocktail = cocktails.find(x => x.ID === keyToValue[0]);
            return (
                <DrinkListItem key={cocktail.ID} cocktail={cocktail} count={keyToValue[1]} />
            );
        });
    }

    render() {
        const content = this.props.drinkList.size > 0 ? 
            <ul className="shopping-cart-items">{this.buildDrinkList(this.props.drinkList, this.props.cocktails)}</ul> :
            <p>Thirsty? Use <span className="icon-plus-square"></span> icons to add to list.</p>;
        return (
            <div>{content}</div>
        );
    }
}

const mapStateToProps = (state) => ({
    cocktails: state.data,
    drinkList: state.drinkList
});

export default connect(mapStateToProps)(DrinkList);