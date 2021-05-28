import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FaPlusSquare } from 'react-icons/fa';
import DrinkListItem from './DrinkListItem';
import { transformSelectedCocktails } from './Redux/store';

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
    render() {
        if (this.props.drinkList.size === 0) {
            return <div><p>Thirsty? Use <FaPlusSquare /> icons to add to list.</p></div>;
        }

        const content = transformSelectedCocktails(this.props.drinkList, this.props.cocktails,
            (cocktail, count) => <DrinkListItem key={cocktail.id} cocktail={cocktail} count={count} />);

        return <div>
            <DrinkListGrid className="noselect">
                {content}
            </DrinkListGrid>
        </div>;
    }
}

const mapStateToProps = ({ app }) => ({
    cocktails: app.data,
    drinkList: app.drinkList
});

export default connect(mapStateToProps)(DrinkList);