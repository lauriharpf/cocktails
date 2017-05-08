import React from 'react';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar sticky-top bg-faded" role="navigation">
                <div>
                    <span className="navbar-brand">
                        Cocktails World
                    </span>

                    <button type="button" className="btn btn-secondary navbar-btn pull-right" onClick={this.props.toggleDrinkList}>
                        <span className="badge">{this.props.drinkListCount}</span><i className="fa fa-shopping-cart"></i> Selections
                    </button>
                </div>
            </nav>
        );
    }
}