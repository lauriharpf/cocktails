import React from 'react';
import { connect } from 'react-redux';
import { FaWindowClose } from 'react-icons/fa';
import { toggleDrinkList } from '../Redux/actions';

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
            <li style={{ marginLeft: "auto", alignSelf: "center" }}>
                <FaWindowClose style={{ cursor: "pointer" }} size="1.5em" onClick={props.toggleDrinkList} />
            </li>
        </ul>
    );
};

const mapDispatchToProps = (dispatch) => ({
    toggleDrinkList: () => dispatch(toggleDrinkList())
});

export default connect(null, mapDispatchToProps)(SelectionTabs);