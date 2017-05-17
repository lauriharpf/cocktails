import React from 'react';
import SelectionTabs from './SelectionTabs.jsx';
import DrinkList from './DrinkList.jsx';
import Ingredients from './Ingredients.jsx';

export default class Selections extends React.Component {
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
        const contents = this.state.selectedTab === "selections" ?
            <DrinkList drinkList={this.props.drinkList} cocktails={this.props.cocktails} showDrinkList={this.props.showDrinkList} changeDrinkCount={this.props.changeDrinkCount} 
                        removeAll={this.props.removeAll}/> :
            <Ingredients drinkList={this.props.drinkList} cocktails={this.props.cocktails} setMetric={this.props.setMetric} metric={this.props.metric} />;

        return (
                <div className={"shopping-cart " + displayClass} id="drinkList">
                    <SelectionTabs changeSelectedTab={this.changeSelectedTab} selectedTab={this.state.selectedTab} />
                    {contents}
                    <button className="btn btn-primary" style={{width: '100%' }} onClick={this.props.toggleDrinkList}>Close</button>
                </div>                
            );
    }
}