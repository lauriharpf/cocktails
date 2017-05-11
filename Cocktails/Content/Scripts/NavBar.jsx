import React from 'react';

const NavBar = (props) => {
    return (
        <nav className="navbar fixed-top bg-faded" role="navigation">
            <div>
                <span className="navbar-brand">
                    Cocktails World
                </span>

                <button type="button" className="btn btn-secondary navbar-btn pull-right" onClick={props.toggleDrinkList}>
                    <span className="badge">{props.drinkListCount}</span><i className="fa fa-shopping-cart"></i> Selections
                </button>
            </div>
        </nav>
      );
};

export default NavBar;