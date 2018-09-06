import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SelectionTabs from './Components/SelectionTabs';
import DrinkList from './DrinkList';
import Ingredients from './Ingredients';
import Recipes from './Components/Recipes';
import FacebookShare from './Components/FacebookShare';

const ScrollArea = styled.div`
    overflow: auto;
    max-height: calc(80vh - 110px); 
`;

const Divider = styled.hr`
    margin-top: 0px;
    margin-bottom: 0px;
`;

const FacebookShareContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ScrollAreaContents = (selectedTab) => {
    switch (selectedTab) {
        case "selections":
            return <DrinkList />;
        case "ingredients":
            return <Ingredients />;
        case "recipes":
            return <Recipes />;
        default:
            return <DrinkList />;
    }
};

const Selections = (props) => {  
    const contents = ScrollAreaContents(props.selectedTab);
    const shareText = props.isDrinkListEmpty ? "Share on" : "Share list on";

    return props.showDrinkList ?
        <div className="shopping-cart" id="drinkList">
            <SelectionTabs />
            <ScrollArea>
                {contents}
            </ScrollArea>
            <Divider />
            <FacebookShareContainer>
                <div style={{ paddingRight: "10px" }}>{shareText}</div>
                <FacebookShare />
            </FacebookShareContainer>
        </div>
        : null;
};

const mapStateToProps = ({ app }) => ({
    selectedTab: app.selectedTab,
    showDrinkList: app.showDrinkList,
    isDrinkListEmpty: app.drinkList.size === 0
});

export default connect(mapStateToProps)(Selections);