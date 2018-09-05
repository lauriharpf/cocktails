import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SelectionTabs from './Components/SelectionTabs';
import DrinkList from './DrinkList';
import Ingredients from './Ingredients';
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

class Selections extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedTab: "selections" };
        this.changeSelectedTab = this.changeSelectedTab.bind(this);
    }

    changeSelectedTab(selectedTab) {
        this.setState({ selectedTab: selectedTab });
    }

    render() {
        const contents = this.state.selectedTab === "selections" ? <DrinkList /> : <Ingredients />;
        const shareText = this.props.isDrinkListEmpty ? "Share on" : "Share list on";

        return this.props.showDrinkList ? 
            <div className="shopping-cart" id="drinkList">                                    
                <SelectionTabs changeSelectedTab={this.changeSelectedTab} selectedTab={this.state.selectedTab} />
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
    }
}

const mapStateToProps = ({ app }) => ({
    showDrinkList: app.showDrinkList,
    isDrinkListEmpty: app.drinkList.size === 0
});


export default connect(mapStateToProps)(Selections);