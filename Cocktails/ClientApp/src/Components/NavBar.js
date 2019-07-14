import React from 'react';
import { connect } from 'react-redux';
import { toggleDrinkList, setFilter } from '../Redux/actions';
import { FaShoppingCart } from 'react-icons/fa';
import styled from 'styled-components';

const NavBarForm = styled.form`
    width: 100%;
    display: flex;
`;

const NavBarControls = styled.div`
    margin-left: auto;
    display: inherit;
    align-items: center;
`;

const CartButton = styled.button`
    margin-left: 5px;
    height: calc(2.25rem + 2px);
    white-space: nowrap;
`;

const NavBar = (props) => {
    return (
        <nav className="navbar fixed-top bg-faded">
            <NavBarForm>
                <span className="navbar-brand">
                    Cocktails World
                        </span>
                <NavBarControls>
                    <input className="form-control mr-sm-2" type="search" placeholder="Find cocktail..." aria-label="Find cocktail" onChange={props.setFilter} style={{ fontSize: "0.9rem" }} />
                    <CartButton type="button" className="btn btn-light float-right" onClick={props.toggleDrinkList}>
                        <span className="badge">{props.drinkListCount}</span> <FaShoppingCart /> <span className="d-none d-md-inline">Selections</span>
                    </CartButton>
                </NavBarControls>
            </NavBarForm>
        </nav>
    );
};

const mapStateToProps = (state) => ({
    drinkListCount: Array.from(state.app.drinkList.entries()).reduce(function (acc, keyToValue) { return acc + keyToValue[1]; }, 0)
});

const mapDispatchToProps = (dispatch) => ({
    toggleDrinkList: () => dispatch(toggleDrinkList()),
    setFilter: (event) => dispatch(setFilter(event.target.value.toLowerCase()))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);