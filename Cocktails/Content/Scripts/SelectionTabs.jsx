import React from 'react';

export default class SelectionTabs extends React.Component {    
    constructor(props) {
        super(props);
    }

    render() {
        var selectionsTabClass = this.props.selectedTab === "selections" ? " active" : "";
        var ingredientsTabClass = this.props.selectedTab === "ingredients" ? " active" : "";

        return (          
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className={"nav-link" + selectionsTabClass} onClick={() => this.props.changeSelectedTab("selections")}>Selections</a>
              </li>
              <li className="nav-item">
                <a className={"nav-link" + ingredientsTabClass} onClick={() => this.props.changeSelectedTab("ingredients")}>Ingredients</a>
              </li>
            </ul>
        );
    }
}