import React from 'react';
import { connect } from 'react-redux';
import SelectionTabs from './Components/SelectionTabs';
import DrinkList from './DrinkList';
import Ingredients from './Ingredients';
import { toggleDrinkList } from './Redux/actions';

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

        return (
                <div className={"shopping-cart " + displayClass} id="drinkList">
                    <SelectionTabs changeSelectedTab={this.changeSelectedTab} selectedTab={this.state.selectedTab} />
                    {contents}
                    <button className="btn btn-primary" style={{width: '100%' }} onClick={this.props.toggleDrinkList}>Close</button>
                </div>                
            );
    }
}

const mapStateToProps = ({ app }) => ({
    showDrinkList: app.showDrinkList
});

const mapDispatchToProps = (dispatch) => ({
    toggleDrinkList: () => dispatch(toggleDrinkList())
});

export default connect(mapStateToProps, mapDispatchToProps)(Selections);