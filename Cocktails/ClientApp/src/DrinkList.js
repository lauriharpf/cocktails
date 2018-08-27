import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DrinkListItem from './DrinkListItem';
import { FaPlusSquare } from 'react-icons/fa';

const DrinkListGrid = styled.ul`
    display: grid;
    grid-template-columns: 30px 24px 24px auto 24px;
    grid-row-gap: 2px;
    column-gap: 2px;
    font-size: 24px;
    align-items: center;
    padding-top: 10px;
`;

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
            <DrinkListGrid className="noselect">
                {this.buildDrinkList(this.props.drinkList, this.props.cocktails)}
            </DrinkListGrid> :
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