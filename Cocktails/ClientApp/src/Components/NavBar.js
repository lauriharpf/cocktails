import React from 'react';
import { connect } from 'react-redux';
import { toggleDrinkList } from '../Redux/actions';

const NavBar = (props) => {
    return (
        <nav className="navbar fixed-top bg-faded">
            <div style={{ width: "100%" }}>
                <span className="navbar-brand">
                    Cocktails World
                </span>

                <button type="button" className="btn btn-light float-right" onClick = { props.toggleDrinkList } >
                    <span className="badge">{props.drinkListCount}</span><span className="icon-shopping-basket"></span> Selections
                </button>
            </div>
        </nav>
      );
};

const mapStateToProps = (state) => ({
    drinkListCount: Array.from(state.app.drinkList.entries()).reduce(function (acc, keyToValue) { return acc + keyToValue[1]; }, 0)
});

const mapDispatchToProps = (dispatch) => ({
    toggleDrinkList: () => dispatch(toggleDrinkList())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);