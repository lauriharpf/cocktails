import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setSelectedTab } from '../Redux/actions';

const Link = styled.a`
  padding: 0.5rem 0.5rem;
`;

const SelectionTab = (props) => {
    const selectedClass = props.selectedTab === props.name ? "active" : "";

    return <li className="nav-item">
        <Link className={"nav-link " + selectedClass} onClick={() => props.changeSelectedTab(props.name)}>{props.text}</Link>
    </li>;
};

const mapStateToProps = ({ app }) => {
    return {
        selectedTab: app.selectedTab
    };
};

const mapDispatchToProps = (dispatch) => ({
    changeSelectedTab: (tabName) => dispatch(setSelectedTab(tabName))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionTab);