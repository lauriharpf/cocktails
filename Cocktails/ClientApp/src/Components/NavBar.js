import React from 'react';
import { connect } from 'react-redux';
import { toggleDrinkList, setFilter } from '../Redux/actions';
import { FaShoppingCart } from 'react-icons/fa';

const NavBar = (props) => {
    return (
        <nav className="navbar fixed-top bg-faded">
            <form style={{ width: "100%", display: "flex" }}>
                <span className="navbar-brand">
                    Cocktails World
                        </span>
                <div style={{ marginLeft: "auto", display: "inherit", alignItems: "center" }}>
                    <input className="form-control mr-sm-2" type="search" placeholder="Find cocktail..." aria-label="Find cocktail" onChange={props.setFilter} style={{ fontSize: "0.9rem" }} />
                    <button type="button" className="btn btn-light float-right" onClick={props.toggleDrinkList} style={{ marginLeft: "5px", height: "calc(2.25rem + 2px)" }}>
                        <span className="badge">{props.drinkListCount}</span> <FaShoppingCart /> <span className="d-none d-md-inline">Selections</span></button>
                </div>
            </form>
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