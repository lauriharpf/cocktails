import React from 'react';
import { connect } from 'react-redux';
import { FaWindowClose } from 'react-icons/fa';
import { toggleDrinkList } from '../Redux/actions';
import styled from 'styled-components';
import SelectionTab from './SelectionTab';

const CloseTab = styled.li`
  margin-left: auto;
  align-self: center;
`;

const CloseIcon = styled(FaWindowClose)`
  cursor: pointer;
`;

const SelectionTabs = (props) =>
    <ul className="nav nav-tabs">
        <SelectionTab text="Selections" name="selections" />
        <SelectionTab text="Ingredients" name="ingredients" />
        <SelectionTab text="Recipes" name="recipes" />
        <CloseTab>
            <CloseIcon size="1.5em" onClick={props.toggleDrinkList} />
        </CloseTab>
    </ul>;

const mapDispatchToProps = (dispatch) => ({
    toggleDrinkList: () => dispatch(toggleDrinkList())
});

export default connect(null, mapDispatchToProps)(SelectionTabs);