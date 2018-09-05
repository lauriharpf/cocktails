import React from 'react';
import { connect } from 'react-redux';
import SelectionTabs from './Components/SelectionTabs';
import DrinkList from './DrinkList';
import Ingredients from './Ingredients';
import FacebookShare from './Components/FacebookShare';

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
        const displayClass = this.props.showDrinkList ? "" : "hidden";
        const contents = this.state.selectedTab === "selections" ? <DrinkList /> : <Ingredients />;
        const shareText = this.props.isDrinkListEmpty ? "Share on" : "Share list on";

        return (
            <div className={"shopping-cart " + displayClass} id="drinkList">                
                    <div style={{ overflowY: "auto", maxHeight: "80vh" }}>
                        <SelectionTabs changeSelectedTab={this.changeSelectedTab} selectedTab={this.state.selectedTab} />
                        {contents}
                        <hr />
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ paddingRight: "10px" }}>{shareText}</div>
                            <FacebookShare />
                        </div>
                    </div>                
            </div>
            );
    }
}

const mapStateToProps = ({ app }) => ({
    showDrinkList: app.showDrinkList,
    isDrinkListEmpty: app.drinkList.size === 0
});


export default connect(mapStateToProps)(Selections);