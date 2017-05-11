import React from 'react';

const NavBar = (props) => {
    return (
        <nav className="navbar fixed-top bg-faded" role="navigation">
            <div>
                <span className="navbar-brand">
                    Cocktails World
                </span>

                <button type="button" className="btn btn-secondary navbar-btn float-right" onClick={props.toggleDrinkList}>
                    <span className="badge">{props.drinkListCount}</span><span className="icon-shopping-basket"></span> Selections
                </button>
            </div>
        </nav>
      );
};

export default NavBar;