import React from 'react';

const SelectionTabs = (props) => {
    var selectionsTabClass = props.selectedTab === "selections" ? " active" : "";
    var ingredientsTabClass = props.selectedTab === "ingredients" ? " active" : "";

    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className={"nav-link" + selectionsTabClass} onClick={() => props.changeSelectedTab("selections")}>Selections</a>
            </li>
            <li className="nav-item">
                <a className={"nav-link" + ingredientsTabClass} onClick={() => props.changeSelectedTab("ingredients")}>Ingredients</a>
            </li>
        </ul>
    );
}
export default SelectionTabs;